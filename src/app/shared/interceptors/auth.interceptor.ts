import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Obtenemos el token del LocalStorage
  const token = localStorage.getItem('token');

  // 2. Si existe el token, clonamos la petición y le añadimos el Header de Autorización
  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq); // Pasamos la petición modificada
  }

  // 3. Si no hay token (ej. cuando recién se están logueando), pasa la petición original
  return next(req);
};
