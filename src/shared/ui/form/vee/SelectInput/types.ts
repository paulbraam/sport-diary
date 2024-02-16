import type { SelectHTMLAttributes } from 'vue';

export interface SelectOption {
  label: string;
  value: unknown;
}

export interface SelectInputProps extends /* @vue-ignore */ SelectHTMLAttributes {
  name: string;
  options: SelectOption[];
}
