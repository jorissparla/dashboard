import { format } from '../utils/format';
import { formatDistance, addHours, addDays } from 'date-fns';
export function FormattedDate(date: Date | string | number) {
  return format(date, 'yyyy-MM-dd');
}
export function FormattedDateNextDay(date: any) {
  return format(addHours(date, 24), 'yyyy-MM-dd');
}
export function LongFormattedDate(date: any) {
  return format(Date.parse(date), 'EEE, dd MMMM yyyy');
}
export function SpecialLongFormattedDate(date: any) {
  return format(date, 'MMMM, dd, yyyy');
}

export function DistanceInWords(date: any) {
  return formatDistance(date, new Date());
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
