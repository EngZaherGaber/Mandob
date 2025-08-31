import { Component, effect, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StateService } from '../../service/state.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { UserStateService } from '../../../general/services/user-state.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { User } from '../../../general/interfaces/user';
import { AuthService } from '../../../general/services/auth.service';
import { DynmaicFormComponent } from '../dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../interface/input-dynamic';

@Component({
  selector: 'header',
  imports: [ButtonModule, CommonModule, TooltipModule, MenuModule, DynmaicFormComponent, DialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('typewriter', [
      transition('* => *', [
        style({ width: '0', opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1, width: '*' })),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  currentState = signal('');
  displayText = signal('');
  isChanging = signal(false);
  isTyping = signal(false); // New signal to track typing state
  user: Partial<User> | null;
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  items: MenuItem[] = [];
  changePasswordForm: { [key: string]: InputDynamic[] } = {};
  visible: boolean = false;
  constructor(
    public stateSrv: StateService,
    private router: Router,
    private userState: UserStateService,
    private authSrv: AuthService
  ) {
    this.user = null;
    this.items = [
      {
        label: '',
        disabled: true,
        icon: 'pi pi-id-card',
      },
      {
        label: '',
        icon: 'pi pi-shield',
        disabled: true,
      },
      {
        separator: true,
      },
      {
        label: 'الحساب',
        icon: 'pi pi-cog',
        command: (event) => {
          this.openAccount();
        },
      },
      {
        label: 'تغيير كلمة السر',
        icon: 'pi pi-lock',
      },
      {
        label: 'تسجيل الخروج',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
    // Only run effects on browser
    if (this.isBrowser) {
      effect(() => {
        const newValue = this.stateSrv.page();
        if (newValue !== this.currentState()) {
          this.changeStateWithAnimation(newValue);
        }
      });
      effect(() => {
        this.items[0] ? (this.items[0].label = 'اسم المستخدم : ' + userState.user?.name) : '';
        this.items[1] ? (this.items[1].label = 'نوع الحساب : ' + userState.user?.role?.toUpperCase()) : '';
      });
    } else {
      // SSR fallback - show full text immediately
      effect(() => {
        this.currentState.set(this.stateSrv.page());
        this.displayText.set(this.stateSrv.page());
      });
    }
    this.changePasswordForm = {
      general: [
        {
          key: 'oldPassword',
          label: 'كلمة السر القديمة',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'newPassword',
          label: 'كلمة السر الجديدة',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
      ],
    };
  }

  private async changeStateWithAnimation(newValue: string) {
    this.isChanging.set(true);

    // Wait for fade out animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    this.currentState.set(newValue);
    this.isChanging.set(false);
    // Typewriter effect
    this.isTyping.set(true);

    // Typewriter effect
    this.displayText.set('');
    for (let i = 0; i < newValue.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Typing speed
      this.displayText.update((text: string) => text + newValue[i]);
    }
    this.isTyping.set(false); // Hide cursor after typing completes
  }
  changePassword(body: any) {
    this.authSrv.changePassword(body).subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['auth/login']);
      }
    });
  }
  openAccount() {
    if (this.user) {
      switch (this.user?.role) {
        case 'owner':
          this.router.navigate(['owner/account']);
          break;

        default:
          break;
      }
    }
  }
  logout() {
    this.userState.strategy()?.logout();
  }
}
