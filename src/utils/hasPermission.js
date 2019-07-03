export function hasPermission(permission, permissionsAr) {
  return permissionsAr.filter(p => p === permission).length > 0;
}
export function hasPermissionEx(permission, permissionsAr) {
  return permissionsAr.filter(p => p.permission.toUpperCase() === permission.toUpperCase()).length > 0;
}
