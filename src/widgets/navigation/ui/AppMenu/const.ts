import type { MenuRouteOption } from './types';

export const MENU_ROUTE_OPTIONS: MenuRouteOption[] = [
  {
    label: 'Тренировки',
    route: '/trainings',
    icon: 'HeartPulse'
  },
  {
    label: 'Настройки',
    route: '/settings',
    icon: 'Settings2'
  },
  {
    label: 'О приложении',
    route: '/about',
    icon: 'Info'
  }
];
