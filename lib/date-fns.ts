import { format } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';
import { getCookieLocale } from './utils';

export const fnsLocales = { en: enUS, ar: arSA };

export const localizedFormat = (
  date: string | number | Date,
  formatStr: string
) => {
  const locale = getCookieLocale();
  return format(date, formatStr, {
    locale: fnsLocales[locale],
  });
};
