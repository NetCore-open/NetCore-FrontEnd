import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersStore } from '../../../users/application/users.store';
import { NotificationsStore } from '../../../notifications/application/notifications.store';
import { IconComponent } from '../../../shared/components/icon/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [RouterLink, IconComponent, TranslateModule],
  templateUrl: './client-dashboard.html',
  styleUrl: './client-dashboard.css'
})
export class ClientDashboardComponent implements OnInit {
  private readonly usersStore = inject(UsersStore);
  private readonly notificationsStore = inject(NotificationsStore);

  readonly user = this.usersStore.currentUser;
  readonly unreadCount = this.notificationsStore.unreadCount;

  readonly greetingKey = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'dashboard.greeting.morning';
    if (hour < 19) return 'dashboard.greeting.afternoon';
    return 'dashboard.greeting.evening';
  });

  ngOnInit(): void {
    this.notificationsStore.loadForCurrentUser();
  }
}
