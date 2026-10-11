export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  COLLAB_MANAGER: "COLLAB_MANAGER",
  BRAND_CLIENT: "BRAND_CLIENT",
  USER: "USER",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];

export const ADMIN_PANEL_ROLES: RoleName[] = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.EDITOR,
  ROLES.COLLAB_MANAGER,
];

export function canAccessAdmin(role: string | undefined | null): boolean {
  return !!role && ADMIN_PANEL_ROLES.includes(role as RoleName);
}

export function isSuperAdmin(role: string | undefined | null): boolean {
  return role === ROLES.SUPER_ADMIN;
}
