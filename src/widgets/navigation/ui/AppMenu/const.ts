import type { MenuRouteOption } from './types';

export const MENU_ROUTE_OPTIONS: MenuRouteOption[] = [
  {
    label: 'Тренировки',
    route: '/trainings',
    icon: ioniconsFitness
  },
  {
    label: 'Настройки',
    route: '/settings',
    icon: ioniconsSettings
  },
  {
    label: 'О приложении',
    route: '/about',
    icon: ioniconsInformationCircle
  }
];
