import { IRouteItem } from 'app/shared/model';
import i18next from 'app/shared/locales';

// Dashboard routes
export const Home = '/home';

export const Routes = {
  Home
};

export const RouteItems: IRouteItem[] = [{ path: Home, icon: 'home', label: 'sideBar.home' }];
