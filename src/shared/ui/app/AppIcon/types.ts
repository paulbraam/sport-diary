import * as icons from 'lucide-vue-next';

export interface AppIconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  strokeWidth?: number;
  defaultClass?: string;
}
