import dayjs from 'dayjs';

export const formatDate = (date: Date | null, format = 'DD.MM.YYYY HH:mm') => {
  return dayjs(date).isValid() ? dayjs(date).format(format) : null;
};
