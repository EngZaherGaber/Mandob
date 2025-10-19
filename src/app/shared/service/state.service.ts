import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';
import { WebsocketService } from '../../general/services/websocket.service';
import { AppState } from '../interface/app-state';
import { NotificationApp } from '../interface/notficiation-app';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state = signal<AppState>({
    page: '',
    width: 0,
    isDark: false,
    isOpenedSideNav: true,
    isOpenedCart: false,
    isOpenedNotficiation: false,
    notficiations: [],
    searchInput: '',
    openSearchMenu: false,
  });
  searchInput$: Subject<string> = new Subject<string>();
  searchInput = computed(() => this.state().searchInput);
  isOpenSearchMenu = computed(() => this.state().openSearchMenu);
  page = computed(() => this.state().page);
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  isOpenedSideNav = computed(() => this.state().isOpenedSideNav);
  isOpenedNotficiation = computed(() => this.state().isOpenedNotficiation);
  notficiations = computed(() => this.state().notficiations);
  isOpenedCart = computed(() => this.state().isOpenedCart);
  screenType = computed(() => {
    const w = this.state().width;
    if (w <= 768) return 'mobile';
    if (w <= 992) return 'tablet';
    return 'desktop';
  });
  isDark = computed(() => this.state().isDark);
  constructor(
    public wsSrv: WebsocketService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.updateTitleFromRoute();
      this.changeSearchInput('');
      this.changeOpenSearchMenu(false);
    });
    this.breakpointObserver
      .observe([
        '(max-width: 768px)', // Mobile threshold
        '(max-width: 992px)', // Tablet threshold
      ])
      .subscribe((result) => {
        if (this.isBrowser()) {
          this.setWidth(window.innerWidth);
        }
      });
    this.getIsDark();
    this.setIsDark(this.isDark());
    this.wsSrv.message$.subscribe((msg) => {
      console.log('📩 Notification:', msg);
      const type = msg.type;
      const value = msg.value;
      switch (type) {
        case 'old_notifications':
          (msg.value as any[]).forEach((noti) => this.addNotification(noti));
          break;
        case 'review':
          this.addNotification(value);
          break;
        default:
          break;
      }
    });
  }

  private updateTitleFromRoute(): void {
    let route = this.router.routerState.root;

    // Traverse the router state tree to find the deepest child with data
    while (route.firstChild) {
      route = route.firstChild;
    }

    // Get the title from route data
    route.title.subscribe((x) => {
      const title = x || 'صفحة غير موجودة';
      this.setPage(title);
    });
  }
  getIsDark() {
    let isDark: string | null = 'false';
    if (this.isBrowser()) {
      isDark = localStorage.getItem('isDark');
      if (isDark === 'true') {
        this.state.update((prev) => ({
          ...prev,
          isDark: true,
        }));
      } else {
        this.state.update((prev) => ({
          ...prev,
          isDark: false,
        }));
      }
    }
  }
  setIsDark(isDark: boolean) {
    if (this.isBrowser()) {
      localStorage.setItem('isDark', String(isDark));
      const element = document.querySelector('html');
      element?.classList.toggle('dark', isDark);
      this.getIsDark();
    }
  }
  setPage(page: string) {
    this.state.update((prev) => ({
      ...prev,
      page: page,
    }));
  }
  setWidth(width: number) {
    this.state.update((prev) => ({
      ...prev,
      width: width,
    }));
  }
  collapseSideNav() {
    this.state.update((prev) => ({
      ...prev,
      isOpenedSideNav: !this.isOpenedSideNav(),
    }));
  }
  collapseNotficiation() {
    this.state.update((prev) => ({
      ...prev,
      isOpenedNotficiation: !this.isOpenedNotficiation(),
    }));
  }
  addNotification(notification: NotificationApp) {
    this.state.update((prev) => ({
      ...prev,
      notficiations: [...this.notficiations(), notification],
    }));
  }
  markNotificationAsRead(id: number) {
    this.state.update((prev) => ({
      ...prev,
      notficiations: [...this.notficiations().filter((x) => x.id !== id)],
    }));
    this.wsSrv.sendMessageToServer('OnNotification', { type: 'mark_read', recordId: id });
  }
  collapseCart() {
    this.state.update((prev) => ({
      ...prev,
      isOpenedCart: !this.isOpenedCart(),
    }));
  }

  changeSearchInput(searchInput: string) {
    this.state.update((prev) => ({
      ...prev,
      searchInput: searchInput,
    }));
    this.searchInput$.next(this.searchInput());
  }
  changeOpenSearchMenu(openSearchMenu: boolean) {
    this.state.update((prev) => ({
      ...prev,
      openSearchMenu: openSearchMenu,
    }));
  }
}
