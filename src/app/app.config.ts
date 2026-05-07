import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Añadimos withFetch

export const appConfig: ApplicationConfig = {
  providers: [
    // Esto optimiza cómo Angular detecta cambios (y quita el error NG0908)
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    // Configuramos el cliente HTTP con Fetch API para mejor rendimiento
    provideHttpClient(withFetch())

    /* A futuro, cuando tengamos el interceptor de seguridad,
       lo añadiremos aquí como en tu ejemplo.
    */
  ]
};
