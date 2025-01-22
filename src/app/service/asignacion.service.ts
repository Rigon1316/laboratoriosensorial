import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  private apiUrl = 'http://localhost:8080/asignaciones';

  constructor(private http: HttpClient) { }

  /**
   * Obtener todas las asignaciones (Solo para ADMIN).
   */
  obtenerTodas(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  /**
   * Obtener asignaciones de un profesional específico.
   * @param cedulaProfesional - La cédula del profesional.
   */
  obtenerPorProfesional(cedulaProfesional: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(`${this.apiUrl}?cedulaProfesional=${cedulaProfesional}`, { headers });
  }

  eliminarAsignacion(id: number): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers, responseType: 'text' });
  }
  obtenerPacientes(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  asignarPacienteAProfesional(asignacion: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}`, asignacion, { headers });
  }
  obtenerAsignacionesDelProfesional(cedula: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/profesional/${cedula}`, { headers });
  }
  crearAsignacion(asignacion: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    // Especificar responseType como 'text'
    return this.http.post('http://localhost:8080/asignaciones', asignacion, {
      headers,
      responseType: 'text', // Especifica que esperas una respuesta en texto
    });
  }



}
