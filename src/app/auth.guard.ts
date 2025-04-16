import { CanActivateFn } from '@angular/router';
import { RestaurantApiService } from './restaurant-api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  
  // Verificamos si el token existe y si es válido
  if (token) {
    // Aquí puedes validar que el token no haya expirado llamando a una función del servicio
    if (RestaurantApiService.isTokenValido(token)) {
      return true; // Permite el acceso a la ruta
    }
  }   

  // Si no es válido o no hay token, redirige al login
  return false;
};