import { isPlatformBrowser } from '@angular/common';
import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ClientStrategy } from '../../client/classes/client-strategy';
import { Client } from '../../client/interfaces/client';
import { CompanyStrategy } from '../../company/classes/company-strategy';
import { Company } from '../../company/interfaces/company';
import { DistributorStrategy } from '../../distributor/classes/distributor-strategy';
import { Distributor } from '../../distributor/interfaces/distributor';
import { OwnerStrategy } from '../../owner/classes/owner-strategy';
import { Owner } from '../../owner/interfaces/owner';
import { User } from '../interfaces/user';
import { UserStrategy } from '../interfaces/user-strategy';
import { AuthService } from './auth.service';
import { WebsocketService } from './websocket.service';

interface StrategyRegistry {
  client: Client;
  company: Company;
  distributor: Distributor;
  owner: Owner;
}
@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private strategies: { [K in keyof StrategyRegistry]: UserStrategy<StrategyRegistry[K]> };
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  role = computed(() => (this.user() ? this.user()?.role : null));
  fingerPrint = computed(() => this.getFingerPrint());
  user = signal<User | null>(null);
  loginForm = signal<{ input: string; password: string } | null>(null);
  strategy = computed(() => {
    const role = this.role();
    if (this.isBrowser() && role && this.isValidRole(role)) {
      return this.getStrategy(role);
    }
    return null;
  });
  constructor(
    private company: CompanyStrategy,
    private client: ClientStrategy,
    private distributor: DistributorStrategy,
    private owner: OwnerStrategy,
    public authSrv: AuthService,
    public wsSrv: WebsocketService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.strategies = {
      client: this.client,
      company: this.company,
      distributor: this.distributor,
      owner: this.owner,
    };
  }
  private isValidRole(role: string): role is keyof StrategyRegistry {
    return ['client', 'company', 'distributor', 'owner'].includes(role);
  }
  private getStrategy<K extends keyof StrategyRegistry>(role: K): UserStrategy<StrategyRegistry[K]> {
    return this.strategies[role];
  }
  private async getFingerPrint(): Promise<string> {
    if (this.isBrowser()) {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      return result.visitorId;
    }
    return '';
  }
  checkUser(): Observable<boolean> {
    if (this.user()) {
      return of(true); // user already exists locally
    }
    return this.authSrv.myInfo().pipe(
      switchMap((res) => {
        if (res.succeeded) {
          this.user.set(res.data);
          this.wsSrv.startConnection(this.user()?.userId ?? 0);
          return of(true);
        } else {
          return of(false);
        }
      }),
      catchError(() => of(false)), // handle errors
    );
  }
}
