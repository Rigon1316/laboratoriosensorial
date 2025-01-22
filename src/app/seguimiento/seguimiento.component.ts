import { Component, OnInit } from '@angular/core';
import { SeguimientoService } from '../service/seguimiento.service';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./seguimiento.component.css'],
})
export class SeguimientoComponent implements OnInit {
  pacientes: any[] = [];
  seguimientos: any[] = [];
  numeroFichaBusqueda: number | null = null;
  busquedaRealizada: boolean = false;
  nuevoSeguimiento = {
    numeroFicha: null as number | null,
    fechaSeguimiento: '',
    estadoId: null,
    observaciones: '',
    actividades: '',
    area: '',
    cedulaProfesional: '',
  };

  estados = [
    { id: 1, nombre: 'INICIADO' },
    { id: 2, nombre: 'EN_PROCESO' },
    { id: 3, nombre: 'OBTENIDO' },
  ];

  actividades: string[] = [
    'Mesa Montessori',
    'Laberinto',
    'Cuerdas',
    'Medusa',
    'Pizarra',
    'Piscina',
    'Camino',
    'Burbujas',
    'Cubos',
    'Panel Sensorial',
  ];

  esAdmin = false;
  Array: any;

  constructor(
    private seguimientoService: SeguimientoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.esAdmin = this.authService.hasRole('ADMIN');
    if (this.esAdmin) {
      this.cargarListadoSeguimientos();
    }
    this.hoy = new Date().toISOString().split('T')[0]; // Formato de fecha YYYY-MM-DD
    this.nuevoSeguimiento.fechaSeguimiento = this.hoy; // Asignar al modelo
  }

  cargarListadoSeguimientos(): void {
    this.seguimientoService.obtenerListadoSeguimientos().subscribe({
      next: (data) => (this.seguimientos = data),
      error: () => alert('No se pudieron cargar los seguimientos.'),
    });
  }

  buscarSeguimientosAdmin(): void {
    if (!this.numeroFichaBusqueda) {
      alert('Por favor, ingrese un número de ficha.');
      return;
    }

    this.seguimientoService.obtenerSeguimientosPorPaciente(this.numeroFichaBusqueda).subscribe({
      next: (data) => {
        this.seguimientos = data;
      },
      error: () => {
        alert('Error al buscar seguimientos.');
        this.seguimientos = [];
      },
    });
  }
 
  
  buscarSeguimientos(): void {
    if (!this.numeroFichaBusqueda) {
      alert('Por favor, ingrese un número de ficha.');
      return;
    }

    this.seguimientoService.obtenerSeguimientosPorPaciente(this.numeroFichaBusqueda).subscribe({
      next: (data) => {
        this.seguimientos = data;
        this.busquedaRealizada = true;
      },
      error: () => {
        alert('Error al buscar seguimientos.');
        this.seguimientos = [];
        this.busquedaRealizada = true;
      },
    });
  }

  toggleActividad(event: any): void {
    const actividad = event.target.value;
    if (event.target.checked) {
      this.nuevoSeguimiento.actividades += this.nuevoSeguimiento.actividades
        ? `, ${actividad}`
        : actividad;
    } else {
      const actividadesArray = this.nuevoSeguimiento.actividades.split(', ').filter(
        (item) => item !== actividad
      );
      this.nuevoSeguimiento.actividades = actividadesArray.join(', ');
    }
  }

  registrarSeguimiento(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.nuevoSeguimiento.cedulaProfesional = payload.sub;
    } else {
      alert('Error: No se encontró un token válido.');
      return;
    }

    if (!this.numeroFichaBusqueda) {
      alert('Error: No se especificó el número de ficha.');
      return;
    }
    this.nuevoSeguimiento.numeroFicha = this.numeroFichaBusqueda;

    this.seguimientoService.crearSeguimiento(this.nuevoSeguimiento).subscribe({
      next: () => {
        alert('Seguimiento registrado correctamente.');
        this.buscarSeguimientos();
        this.nuevoSeguimiento = {
          numeroFicha: this.numeroFichaBusqueda,
          fechaSeguimiento: '',
          estadoId: null,
          observaciones: '',
          actividades: '',
          area: '',
          cedulaProfesional: '',
        };
      },
      error: (err) => {
        console.error('Error al registrar el seguimiento:', err);
        alert('Error al registrar el seguimiento.');
      },
    });
  }
  hoy: string = '';

}
