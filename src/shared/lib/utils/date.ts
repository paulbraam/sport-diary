import dayjs from 'dayjs';

export const formatDate = (date: Date | null, format = 'YYYY/MM/DD HH:mm') => {
  return dayjs(date).isValid() ? dayjs(date).format(format) : null;
};
