import { computed, effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';
import { CompanyStrategy } from '../../company/classes/company-strategy';
import { UserStrategy } from '../interfaces/user-strategy';
import { MenuItem } from 'primeng/api';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { DistributorStrategy } from '../../distributor/classes/distributor-strategy';
import { AdminStrategy } from '../../admin/classes/admin-strategy';
import { isPlatformBrowser } from '@angular/common';
import { ClientStrategy } from '../../client/classes/client-strategy';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userState = signal<User>({
    id: 0,
    username: '',
    name: '',
    address: '',
    commercialRegistrationNumber: '',
    companyLogos: [],
    email: '',
    phoneNumber: '',
    role: 'company',
    password: '',
  });
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  token = computed(() => {
    let token;
    if (this.isBrowser()) {
      token = localStorage.getItem('accessToken');
    }
    return token;
  });

  strategy: UserStrategy | null = null;
  helper = new JwtHelperService();
  constructor(
    private router: Router,
    private companyStrategy: CompanyStrategy,
    private clientStrategy: ClientStrategy,
    private distributorStrategy: DistributorStrategy,
    private adminStrategy: AdminStrategy,
    @Inject(PLATFORM_ID) private platformId: Object,
    private msgSrv: MessageToastService
  ) {}
  setStrategy() {
    if (this.isBrowser()) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const role = this.helper.decodeToken(token).role;
        switch (role) {
          case 'company':
            this.strategy = this.companyStrategy;
            break;
          case 'client':
            this.strategy = this.clientStrategy;
            break;
          case 'distributor':
            this.strategy = this.distributorStrategy;
            break;
          case 'owner':
            this.strategy = this.adminStrategy;
            break;
          default:
            throw new Error('Unsupported role');
        }
      }
    }
  }
  storeUser(user: User | null) {
    if (this.isBrowser()) {
      if (user) {
        this.userState.set(user);
        this.setStrategy();
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.userState.set({
          id: 0,
          username: '',
          name: '',
          address: '',
          commercialRegistrationNumber: '',
          companyLogos: [],
          email: '',
          phoneNumber: '',
          role: 'company',
          password: '',
        });
        localStorage.clear();
      }
    }
  }
  getNavMenu(): MenuItem[] {
    return this.strategy ? this.strategy.getNavMenu(this.userState().role) : [];
  }
  checkUser(): boolean {
    if (this.isBrowser()) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        return true;
      }
    }
    return false;
  }
  getUserState() {
    return this.userState();
  }
  setToken(accessToken: string, refreshToken: string) {
    if (this.isBrowser()) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  logout() {
    this.storeUser(null);
    this.router.navigate(['auth/login']);
  }
  getUser() {
    if (this.isBrowser()) {
      const token = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');
      if (token && !user) {
        const userId = this.helper.decodeToken(token).nameid;
        this.setStrategy();
        this.strategy?.getById(+userId).subscribe((res) => {
          this.storeUser(res.data);
          this.msgSrv.showSuccess('اهلا وسهلا ' + res.data.name);
        });
      }
    }
  }
}
