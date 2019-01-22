const returnInitials = fullname => {
  return fullname
    .split(' ')
    .map(item => item[0])
    .join('')
    .toUpperCase();
};
