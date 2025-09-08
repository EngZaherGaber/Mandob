import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from '../../../general/interfaces/user';
import { AuthService } from '../../../general/services/auth.service';
import { UserStateService } from '../../../general/services/user-state.service';
import { InputDynamic } from '../../interface/input-dynamic';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { StateService } from '../../service/state.service';
import { DynmaicFormComponent } from '../dynmaic-form/dynmaic-form.component';

@Component({
  selector: 'header',
  imports: [PrimeNgSharedModule, DynmaicFormComponent],
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
    private userState: UserStateService,
    private router: Router,
    private authSrv: AuthService
  ) {
    this.user = null;
    this.items = [
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
        label: 'معرض الصور',
        icon: 'pi pi-images',
        command: (event) => {
          this.openGallery();
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
        this.user = userState.user;
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
    this.router.navigate(['/account']);
  }
  openGallery() {
    this.router.navigate(['/gallery']);
  }
  logout() {
    this.userState.user = null;
    this.userState.strategy()?.logout();
  }
}
