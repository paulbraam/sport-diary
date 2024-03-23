import * as icons from 'lucide-vue-next';

export interface AppMenuProps {
  contentId: string;
}

export interface MenuRouteOption {
  label: string;
  route: string;
  icon: keyof typeof icons;
}
