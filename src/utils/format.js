import { format as orgformat, formatDistanceToNow as orgdistanceInWordsToNow } from 'date-fns';

export function format(date, formatstring) {
  if (typeof date === 'string') {
    return orgformat(parseInt(date), formatstring);
  } else {
    return orgformat(date, formatstring);
  }
}

export function formatDistanceToNow(date) {
  if (typeof date === 'string') {
    return orgdistanceInWordsToNow(parseInt(date));
  } else return orgdistanceInWordsToNow(date);
}

const YMD_FORMAT = 'yyyy-MM-dd';
export function ymdFormat(date) {
  return format(date, YMD_FORMAT);
}
