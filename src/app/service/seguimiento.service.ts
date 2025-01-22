import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SeguimientoService {
    private baseUrl = 'http://localhost:8080/seguimientos';
    private pacientesUrl = 'http://localhost:8080/pacientes';

    constructor(private http: HttpClient) { }

    obtenerPacientesAsignados(): Observable<any[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<any[]>(`${this.pacientesUrl}/asignados`, { headers });
    }

  obtenerSeguimientosPorPaciente(numeroFicha: number): Observable<any[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<any[]>(`${this.baseUrl}/paciente/${numeroFicha}`, { headers });
}


    // seguimiento.service.ts
    crearSeguimiento(seguimiento: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(this.baseUrl, seguimiento, { headers });
    }


    private getAuthHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        });
    }
    obtenerListadoSeguimientos(): Observable<any[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<any[]>(`${this.baseUrl}/listado`, { headers });
    }
}
