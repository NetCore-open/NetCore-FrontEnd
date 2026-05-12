import { UserRole } from '../../users/domain/model/user.entity';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
  showBadge?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'home',
    roles: ['CLIENT']
  },
  {
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'home',
    roles: ['ADMIN']
  },
  {
    label: 'Notificaciones',
    path: '/notifications',
    icon: 'bell',
    roles: ['CLIENT', 'ADMIN'],
    showBadge: true
  },
  {
    label: 'Mis pedidos',
    path: '/orders',
    icon: 'package',
    roles: ['CLIENT']
  },
  {
    label: 'Inventario',
    path: '/admin/inventory',
    icon: 'box',
    roles: ['ADMIN']
  },
  {
    label: 'Pedidos',
    path: '/admin/pedidos',
    icon: 'package',
    roles: ['ADMIN']
  },
  {
    label: 'Logística',
    path: '/admin/logistics',
    icon: 'truck',
    roles: ['ADMIN']
  },
  {
    label: 'Planes',
    path: '/admin/plans',
    icon: 'credit-card',
    roles: ['ADMIN']
  },
  {
    label: 'Suscripciones',
    path: '/admin/subscriptions',
    icon: 'refresh-cw',
    roles: ['ADMIN']
  }
];
