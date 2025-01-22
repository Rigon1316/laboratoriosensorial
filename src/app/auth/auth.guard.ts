import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const roles = decodedToken.roles || '';

        if (roles.includes('ADMIN') || roles.includes('PROFESIONAL')) {
          return true; // Permitir acceso tanto a ADMIN como a PROFESIONAL
        }
      }
      alert('Acceso denegado. Solo los administradores y profesionales pueden acceder a esta página.');
      this.router.navigate(['/']);
      return false;
    }

    // Si no está autenticado, redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}
