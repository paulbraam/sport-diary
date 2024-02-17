import type { SelectHTMLAttributes } from 'vue';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectInputProps extends /* @vue-ignore */ SelectHTMLAttributes {
  name: string;
  options: SelectOption[];
}
