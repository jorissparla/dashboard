export function initials(name) {
  return name
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase();
}
