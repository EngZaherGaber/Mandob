import { effect, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';
import { CompanyStrategy } from '../../company/classes/company-strategy';
import { UserStrategy } from '../interfaces/user-strategy';
import { MenuItem } from 'primeng/api';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { MarketStrategy } from '../../market/classes/market-strategy';
import { DistributorStrategy } from '../../distributor/classes/distributor-strategy';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userState = signal<User>({
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: 'company',
    password: '',
  });
  private users: User[] = [
    {
      id: 1,
      username: 'company_admin',
      email: 'ahmed.salem@company.com',
      firstName: 'Ahmed',
      lastName: 'Salem',
      phoneNumber: '01012345678',
      password: 'Pass@123',
      role: 'company',
    },
    {
      id: 2,
      username: 'market_manager',
      email: 'fatma.ali@market.com',
      firstName: 'Fatma',
      lastName: 'Ali',
      phoneNumber: '01087654321',
      password: 'Market#456',
      role: 'market',
    },
    {
      id: 3,
      username: 'distributor1',
      email: 'khalid.yousef@distributor.com',
      firstName: 'Khalid',
      lastName: 'Yousef',
      phoneNumber: '01122334455',
      password: 'Distrib$789',
      role: 'distributor',
    },
    {
      id: 4,
      username: 'comp_user2',
      email: 'laila.mahmoud@company.com',
      firstName: 'Laila',
      lastName: 'Mahmoud',
      phoneNumber: '01234567890',
      password: 'Comp!2024',
      role: 'company',
    },
    {
      id: 5,
      username: 'market_user2',
      email: 'hassan.tariq@market.com',
      firstName: 'Hassan',
      lastName: 'Tariq',
      phoneNumber: '01099887766',
      password: 'Hass@n456',
      role: 'market',
    },
    {
      id: 6,
      username: 'distr_user2',
      email: 'noor.ismail@distributor.com',
      firstName: 'Noor',
      lastName: 'Ismail',
      phoneNumber: '01155667788',
      password: 'Noor#321',
      role: 'distributor',
    },
    {
      id: 7,
      username: 'comp_admin3',
      email: 'sami.adel@company.com',
      firstName: 'Sami',
      lastName: 'Adel',
      phoneNumber: '01066778899',
      password: 'Sami@Admin',
      role: 'company',
    },
    {
      id: 8,
      username: 'market_ali',
      email: 'amina.kamel@market.com',
      firstName: 'Amina',
      lastName: 'Kamel',
      phoneNumber: '01233445566',
      password: 'Amina#Pass',
      role: 'market',
    },
    {
      id: 9,
      username: 'distrib_team',
      email: 'omar.farid@distributor.com',
      firstName: 'Omar',
      lastName: 'Farid',
      phoneNumber: '01044556677',
      password: 'Omar$2024',
      role: 'distributor',
    },
    {
      id: 10,
      username: 'TestUser 113',
      email: 'fatma.rashid@company.com',
      firstName: 'Fatma',
      lastName: 'Rashid',
      phoneNumber: '01177889900',
      password: '123',
      role: 'company',
    }
  ];

  private strategy: UserStrategy | null = null;
  constructor(
    private router: Router,
    private companyStrategy: CompanyStrategy,
    private marketStrategy: MarketStrategy,
    private distributorStrategy: DistributorStrategy,
    private msgSrv: MessageToastService,) {
    effect(() => { });
  }
  setStrategy(user: User) {
    switch (user.role) {
      case 'company':
        this.strategy = this.companyStrategy;
        break;
      case 'market':
        this.strategy = this.marketStrategy;
        break;
      case 'distributor':
        this.strategy = this.distributorStrategy;
        break;
      default:
        throw new Error('Unsupported role');
    }
  }
  storeUser(user: User | null) {
    if (user) {
      this.userState.set(user);
      this.setStrategy(this.userState());
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      this.userState.set({
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: 'company',
        password: '',
      });
      localStorage.clear();
    }
  }
  getNavMenu(): MenuItem[] {
    return this.strategy ? this.strategy.getNavMenu(this.userState().role) : [];
  }
  checkUser(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      this.userState.set(JSON.parse(user));
      return true;
    }
    return false;
  }
  logout() {
    this.storeUser(null);
    this.router.navigate(['login']);
  }
  login(input: string, password: string) {
    const lowerInput = input.toLowerCase();
    const user = this.users.find(user =>
      (
        user.username.toLowerCase() === lowerInput ||
        user.email.toLowerCase() === lowerInput ||
        user.phoneNumber.toLowerCase() === lowerInput
      ) && user.password === password);
    if (user) {
      this.storeUser(user)
      this.msgSrv.showSuccess('تم تسجيل الدخول');
      this.router.navigate(['']);
    } else {
      this.storeUser(null)
      this.msgSrv.showError('معلومات التسجيل غير صحيحة')
    }
  }
}
