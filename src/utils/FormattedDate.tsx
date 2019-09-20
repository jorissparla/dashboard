import { format } from '../utils/format';
import { distanceInWords, addHours, addDays } from 'date-fns';
export function FormattedDate(date: Date | string | number) {
  return format(date, 'YYYY-MM-DD');
}
export function FormattedDateNextDay(date: Date | string | number) {
  return format(addHours(date, 24), 'YYYY-MM-DD');
}
export function LongFormattedDate(date: string) {
  return format(Date.parse(date), 'ddd, DD MMMM YYYY');
}
export function SpecialLongFormattedDate(date: Date | string | number) {
  return format(date, 'MMMM, DD, YYYY');
}

export function DistanceInWords(date: Date | string | number) {
  return distanceInWords(date, new Date());
}
export function FormattedDateNow() {
  return FormattedDate(Date.now());
}

export function StartOfYear(year: number) {
  return FormattedDate(new Date(year, 0, 1));
}

export function StartOfThisYear() {
  return FormattedDate(new Date(new Date().getFullYear(), 0, 1));
}
export function StartOfNextYear() {
  return FormattedDate(new Date(new Date().getFullYear() + 1, 0, 1));
}

export function WeekAgo() {
  return FormattedDate(addDays(new Date(), -7));
}
export function HalfYearAgo() {
  return FormattedDate(addDays(new Date(), -180));
}
