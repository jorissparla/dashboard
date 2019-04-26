import { format as orgformat, distanceInWordsToNow as orgdistanceInWordsToNow } from "date-fns";

export function format(date, formatstring) {
  if (typeof date === "string") {
    return orgformat(parseInt(date), formatstring);
  } else {
    return orgformat(date, formatstring);
  }
}

export function distanceInWordsToNow(date) {
  if (typeof date === "string") {
    return orgdistanceInWordsToNow(parseInt(date));
  } else return orgdistanceInWordsToNow(date);
}
