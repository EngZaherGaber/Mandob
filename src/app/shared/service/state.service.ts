import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { AppState } from '../interface/app-state';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';

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
  });

  page = computed(() => this.state().page);
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  isOpenedSideNav = computed(() => this.state().isOpenedSideNav);
  isOpenedCart = computed(() => this.state().isOpenedCart);
  screenType = computed(() => {
    const w = this.state().width;
    if (w <= 768) return 'mobile';
    if (w <= 992) return 'tablet';
    return 'desktop';
  });
  isDark = computed(() => this.state().isDark);
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.updateTitleFromRoute();
    });
    this.breakpointObserver
      .observe([
        '(max-width: 768px)', // Mobile threshold
        '(max-width: 992px)', // Tablet threshold
      ])
      .subscribe((result) => {
        this.setWidth(window.innerWidth);
      });
    this.getIsDark();
    this.setIsDark(this.isDark());
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
    localStorage.setItem('isDark', String(isDark));
    const element = document.querySelector('html');
    element?.classList.toggle('dark', isDark);
    this.getIsDark();
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
  collapseCart() {
    this.state.update((prev) => ({
      ...prev,
      isOpenedCart: !this.isOpenedCart(),
    }));
  }
}
