import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersStore } from '../../../users/application/users.store';
import { NotificationsStore } from '../../../notifications/application/notifications.store';
import { NAV_ITEMS } from '../../application/nav-items';
import { IconComponent } from '../../../shared/components/icon/icon';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private readonly usersStore = inject(UsersStore);
  private readonly notificationsStore = inject(NotificationsStore);
  private readonly translate = inject(TranslateService);

  readonly currentUser = this.usersStore.currentUser;
  readonly unreadCount = this.notificationsStore.unreadCount;
  readonly currentLang = computed(() => this.translate.currentLang ?? 'es');

  readonly navItems = computed(() => {
    const user = this.currentUser();
    if (!user) return [];
    return NAV_ITEMS.filter((item) => item.roles.includes(user.role));
  });

  readonly userInitials = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  });

  readonly roleLabel = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    return user.role === 'ADMIN'
      ? this.translate.instant('sidebar.admin')
      : this.translate.instant('sidebar.client');
  });

  switchLang(lang: string): void {
    this.translate.use(lang);
  }

  logout(): void {
    this.usersStore.logout();
  }
}
