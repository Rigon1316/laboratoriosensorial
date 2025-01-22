import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  /**
   * Iniciar sesión con credenciales
   */
  login(credentials: { cedula: string; contraseña: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Almacenar el token
        }
      })
    );
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem('token');
    document.cookie = 'jwt=; Max-Age=0; path=/';
  }

  /**
   * Obtener el token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken();
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      return payload?.exp && payload.exp < currentTime; // Compara con la fecha de expiración
    }
    return true;
  }
  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  /**
   * Obtener el payload del token decodificado
   */
  public decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload
        return payload;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }


  /**
   * Obtener el rol del usuario
   */
  getRole(): string | null {
    const payload = this.decodeToken();
    return payload?.roles || null;
  }
  hasRole(role: string): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.roles) return false;

    return decoded.roles.includes(role);
  }



  /**
   * Validar si el usuario tiene rol ADMIN
   */
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
  isProfesional(): boolean {
    return this.getRole() === 'PROFESIONAL';
  }
}
