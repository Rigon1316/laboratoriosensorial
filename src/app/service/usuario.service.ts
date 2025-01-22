import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }
  agregarUsuario(usuario: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, usuario, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            console.error('Cédula duplicada:', error.error);
            alert('Error: La cédula ya existe en el sistema.');
          } else if (error.status === 400) {
            console.error('Error de validación:', error.error);
            alert(`Error: ${error.error}`);
          } else {
            console.error('Error inesperado:', error);
            alert('Error inesperado al crear el usuario.');
          }
          return throwError(() => error);
        })
      );
  }
  /**
   * Obtener la lista de usuarios (Solo para ADMIN).
   */
  obtenerUsuarios(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  /**
   * Eliminar un usuario por su ID (Solo para ADMIN).
   */
  eliminarUsuario(endpoint: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080${endpoint}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }
  obtenerProfesionales(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>('http://localhost:8080/usuarios/profesionales', { headers });
  }


}
