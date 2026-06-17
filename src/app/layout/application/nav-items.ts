import { UserRole } from '../../users/domain/model/user.entity';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
  showBadge?: boolean;
  i18nKey: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard',          icon: 'home',        roles: ['CLIENT'],          i18nKey: 'dashboard' },
  { label: 'Dashboard', path: '/admin/dashboard',    icon: 'home',        roles: ['ADMIN'],           i18nKey: 'dashboard' },
  { label: 'Notificaciones', path: '/notifications', icon: 'bell',        roles: ['CLIENT', 'ADMIN'], i18nKey: 'notifications', showBadge: true },
  { label: 'Mis pedidos', path: '/orders',           icon: 'package',     roles: ['CLIENT'],          i18nKey: 'orders' },
  { label: 'Inventario', path: '/admin/inventory',   icon: 'box',         roles: ['ADMIN'],           i18nKey: 'inventory' },
  { label: 'Pedidos', path: '/admin/orders',         icon: 'package',     roles: ['ADMIN'],           i18nKey: 'admin-orders' },
  { label: 'Pedidos Admin', path: '/admin/pedidos',   icon: 'package',     roles: ['ADMIN'],           i18nKey: 'pedidos' },
  { label: 'Logística', path: '/admin/logistics',    icon: 'truck',       roles: ['ADMIN'],           i18nKey: 'logistics' },
  { label: 'Planes', path: '/admin/plans',           icon: 'credit-card', roles: ['ADMIN'],           i18nKey: 'plans' },
  { label: 'Suscripciones', path: '/admin/subscriptions', icon: 'refresh-cw', roles: ['ADMIN'],      i18nKey: 'subscriptions' },
];
