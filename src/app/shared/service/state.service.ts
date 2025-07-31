import { computed, Injectable, signal } from '@angular/core';
import { AppState } from '../interface/app-state';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state = signal<AppState>({
    page: '',
    isOpenedSideNav: true,
  });

  public page = computed(() => this.state().page);
  public isOpenedSideNav = computed(() => this.state().isOpenedSideNav);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateTitleFromRoute();
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
      const title = x || 'صفحة غير معروفة';
      this.setPage(title);
    });
  }

  setPage(page: string) {
    this.state.update((prev) => ({
      ...prev,
      page: page,
    }));
  }
  collapseSideNav() {
    this.state.update((prev) => ({
      ...prev,
      isOpenedSideNav: !this.isOpenedSideNav(),
    }));
  }
}
