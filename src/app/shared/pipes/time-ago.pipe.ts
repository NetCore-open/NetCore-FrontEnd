import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false
})
export class TimeAgoPipe implements PipeTransform {
  private readonly translate = inject(TranslateService);

  transform(value: Date | string | null | undefined): string {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const isEn = this.translate.currentLang === 'en';

    if (seconds < 0) return isEn ? 'in a moment' : 'en breve';
    if (seconds < 60) return isEn ? 'a few seconds ago' : 'hace unos segundos';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      if (isEn) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      if (isEn) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      if (isEn) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      if (isEn) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
      return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      if (isEn) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
      return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    }

    const years = Math.floor(days / 365);
    if (isEn) return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
  }
}
