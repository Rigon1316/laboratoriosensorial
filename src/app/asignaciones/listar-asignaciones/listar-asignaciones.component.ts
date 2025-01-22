import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../../service/asignacion.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../componetes/table/table.component';

@Component({
  selector: 'app-listar-asignaciones',
  templateUrl: './listar-asignaciones.component.html',
  imports: [
    CommonModule, FormsModule, TableComponent
  ],
  styleUrls: ['./listar-asignaciones.component.css']
})
export class ListarAsignacionesComponent implements OnInit {
  asignaciones: any[] = [];
  error: string = '';
  esAdmin: boolean = false;

  constructor(
    private asignacionService: AsignacionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.verificarRol();
    this.cargarAsignaciones();
  }

  /**
   * Verificar si el usuario es ADMIN.
   */
  verificarRol(): void {
    this.esAdmin = this.authService.hasRole('ADMIN');
  }

  /**
   * Cargar asignaciones dependiendo del rol del usuario.
   */
  cargarAsignaciones(): void {
    if (this.esAdmin) {
      // ADMIN: Cargar todas las asignaciones
      this.asignacionService.obtenerTodas().subscribe({
        next: (data) => {
          this.asignaciones = data;
        },
        error: (err) => {
          console.error('Error al obtener asignaciones:', err);
          this.error = 'No se pudieron cargar las asignaciones.';
        }
      });
    } else {
      // PROFESIONAL: Cargar solo las asignaciones relacionadas con su cédula
      const cedulaProfesional = this.authService.decodeToken()?.sub; // Extraer la cédula del token
      this.asignacionService.obtenerPorProfesional(cedulaProfesional).subscribe({
        next: (data) => {
          this.asignaciones = data;
        },
        error: (err) => {
          console.error('Error al obtener asignaciones del profesional:', err);
          this.error = 'No se pudieron cargar tus asignaciones.';
        }
      });
    }
  }

  /**
   * Eliminar una asignación por su ID.
   * @param id - ID de la asignación a eliminar.
   */
  eliminarAsignacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignación?')) {
      this.asignacionService.eliminarAsignacion(id).subscribe({
        next: () => {
          alert('Asignación eliminada correctamente.');
          this.cargarAsignaciones(); // Recargar la lista
        },
        error: (err) => {
          console.error('Error al eliminar asignación:', err);
          alert('No se pudo eliminar la asignación.');
        }
      });
    }
  }
}
