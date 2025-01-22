import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:8080/pacientes';
  pacienteService: any;
  router: any;

  constructor(private http: HttpClient) { }
  crearPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, paciente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  obtenerPacientes(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }


  eliminarPaciente(numeroFicha: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}/${numeroFicha}`, { headers });
  }
  obtenerPacientesAsignados(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/asignados`, { headers });
  }
}
