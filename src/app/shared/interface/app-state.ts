import { NotificationApp } from './notficiation-app';
export interface AppState {
  page: string;
  width: number;
  isDark: boolean;
  isOpenedSideNav: boolean;
  isOpenedCart: boolean;
  isOpenedNotficiation: boolean;
  notficiations: NotificationApp[];
  searchInput: string;
  openSearchMenu: boolean;
}
