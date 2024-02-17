import type { InputHTMLAttributes } from 'vue';

export interface DateInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  name: string;
  presentation?: 'date-time' | 'time-date' | 'date' | 'time' | 'month' | 'year' | 'month-year';
}
