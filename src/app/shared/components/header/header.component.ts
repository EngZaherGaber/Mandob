import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { catchError, debounceTime, distinctUntilChanged, of, Subscription, switchMap } from 'rxjs';
import { ClientToolSearchMenuComponent } from '../../../client/components/tools/client-tool-search-menu/client-tool-search-menu.component';
import { GlobalSearchResponse } from '../../../client/interfaces/global-search-response';
import { User } from '../../../general/interfaces/user';
import { AuthService } from '../../../general/services/auth.service';
import { UserStateService } from '../../../general/services/user-state.service';
import { ProductStoreService } from '../../../product/services/product-store.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { InputDynamic } from '../../interface/input-dynamic';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { MessageToastService } from '../../service/message-toast.service';
import { StateService } from '../../service/state.service';
import { DynmaicFormComponent } from '../dynmaic-form/dynmaic-form.component';
@Component({
  selector: 'header',
  imports: [
    PrimeNgSharedModule,
    DynmaicFormComponent,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideDirective,
    ClientToolSearchMenuComponent,
  ],
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
  changePasswordForm: { [key: string]: InputDynamic[] } = {
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
  changePasswordvisible: boolean = false;
  changePhoneNumberForm: { [key: string]: InputDynamic[] } = {
    newPhoneNumber: [
      {
        key: 'password',
        label: 'كلمة السر',
        value: null,
        dataType: 'string',
        required: true,
        visible: true,
        options: [],
      },
      {
        key: 'newPhoneNumber',
        label: 'رقم الهاتف الجديد',
        value: null,
        dataType: 'string',
        required: true,
        visible: true,
        options: [],
      },
    ],
    code: [
      {
        key: 'code',
        label: 'الكود',
        value: null,
        dataType: 'string',
        required: true,
        visible: true,
        options: [],
      },
    ],
  };
  changePhoneNumbervisible: boolean = false;
  stepsPhoneNumberList: MenuItem[] = [{ label: 'رقم الهاتف الجديد' }, { label: 'التحقق' }];
  activeIndexPhoneNumber: number = 0;
  searchLoading: boolean = false;
  searchResult: GlobalSearchResponse | null = null;
  messages: any[] = [];
  private sub!: Subscription;
  constructor(
    public stateSrv: StateService,
    private userState: UserStateService,
    private router: Router,
    private authSrv: AuthService,
    private msgSrv: MessageToastService,
    private productStore: ProductStoreService,
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
        command: () => {
          this.changePasswordvisible = true;
        },
      },
      {
        label: 'تغيير رقم الهاتف',
        icon: 'pi pi-address-book',
        command: () => {
          this.changePhoneNumbervisible = true;
        },
      },
      {
        label: 'تسجيل الخروج',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
    this.stateSrv.searchInput$
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((value) => {
          if (value) {
            this.searchLoading = true;
            return productStore.globalSearch(value);
          } else {
            return of(null);
          }
        }),
      )
      .pipe(
        catchError((err) => {
          this.searchLoading = false;
          return of(null);
        }),
      )
      .subscribe((res) => {
        if (res) {
          this.stateSrv.changeOpenSearchMenu(true);
          this.searchLoading = false;
          this.searchResult = res.data;
        }
      });
    // Only run effects on browser
    if (this.isBrowser) {
      effect(() => {
        const newValue = this.stateSrv.page();
        if (newValue !== this.currentState()) {
          this.changeStateWithAnimation(newValue);
        }
      });
      effect(() => {
        this.user = userState.user();
      });
    } else {
      // SSR fallback - show full text immediately
      effect(() => {
        this.currentState.set(this.stateSrv.page());
        this.displayText.set(this.stateSrv.page());
      });
    }
  }
  ngOnInit() {
    this.userState.wsSrv.message$.subscribe((msg) => {
      console.log('📩 Notification:', msg);
      const type = msg.type;
      switch (type) {
        case 'old_notifications':
          this.messages.push(...msg.value);
          break;
        default:
          break;
      }
    });
  }
  changeSearchInput(event: string) {
    this.stateSrv.changeSearchInput(event);
  }
  onClickOutside(event: any) {
    if (this.stateSrv.isOpenSearchMenu()) {
      this.stateSrv.changeOpenSearchMenu(false);
      this.searchResult = null;
      this.searchLoading = false;
    }
  }

  seeMoreNavigation() {
    this.router.navigate(['client/product/group/search/' + this.stateSrv.searchInput() + '/0']);
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
    this.userState
      .strategy()
      ?.logout()
      .subscribe((res) => {
        if (res) {
          this.userState.user.set(null);
        }
      });
  }
  closeDialog(event: any, objs: { [key: string]: InputDynamic[] }) {
    Object.keys(objs).forEach((x) => {
      objs[x].map((z) => {
        z.value = null;
        return z;
      });
    });
  }
  changePhoneNumber(event: { index: number; form: FormGroup }) {
    const strategy = this.userState.strategy();
    if (event.index === 1 && strategy) {
      strategy.changePhoneNumber(event.form.value['newPhoneNumber']).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        this.activeIndexPhoneNumber = res.succeeded ? 1 : 0;
      });
    }
  }
  verifyChangePhoneNumber(event: any) {
    const strategy = this.userState.strategy();
    if (strategy) {
      strategy
        .VerifyChangePhoneNumber({
          code: event['code']['code'],
          newPhoneNumber: event['newPhoneNumber']['newPhoneNumber'],
        })
        .subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          this.changePhoneNumbervisible = !res.succeeded;
        });
    }
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.userState.wsSrv.stopConnection();
  }
}
