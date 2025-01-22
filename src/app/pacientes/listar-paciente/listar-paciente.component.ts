import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';
import { HistoriaClinicaService } from '../../service/historia-clinica.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from "../../componetes/table/table.component";
@Component({
  selector: 'app-listar-pacientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent
],
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacientesComponent implements OnInit {
  pacientes: any[] = [];
  error: string = '';
  esAdmin: boolean = false;
  esProfesional: boolean = false;

  mostrarModal: boolean = false;
  pacienteSeleccionado: any = null;

  mostrarModalHistoriaClinica: boolean = false;
  historiaClinicaSeleccionada: any = null;


  // Propiedad para gestionar las secciones
  currentSection: string = 'Datos Básicos';

  constructor(
    private pacienteService: PacienteService,
    private historiaClinicaService: HistoriaClinicaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificarRol();
    this.cargarPacientes();
  }

  verificarRol(): void {
    this.esAdmin = this.authService.hasRole('ADMIN');
    this.esProfesional = this.authService.hasRole('PROFESIONAL');
  }

  cargarPacientes(): void {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => {
        console.error('Error al obtener pacientes:', err);
        this.error = 'No se pudo cargar la lista de pacientes.';
      }
    });
  }

  verInformacion(paciente: any): void {
    this.pacienteSeleccionado = paciente;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pacienteSeleccionado = null;
  }

  verHistoriaClinica(numeroFicha: number): void {
    this.historiaClinicaService.obtenerHistoriaClinica(numeroFicha).subscribe({
      next: (data) => {
        this.historiaClinicaSeleccionada = data;
        this.mostrarModalHistoriaClinica = true;
      },
      error: (err) => {
        console.error('Error al obtener historia clínica:', err);
        alert('No se pudo cargar la historia clínica.');
      }
    });
  }

  guardarHistoriaClinica(): void {

    this.historiaClinicaService.actualizarHistoriaClinica(this.historiaClinicaSeleccionada).subscribe({
      next: (response) => {
        alert(response.mensaje || 'Historia clínica actualizada correctamente.');
        this.cerrarModalHistoriaClinica();
      },
      error: (err) => {
        console.error('Error al actualizar historia clínica:', err);
        alert('No se pudo actualizar la historia clínica.');
      }
    });
  }


  cerrarModalHistoriaClinica(): void {
    this.mostrarModalHistoriaClinica = false;
    this.historiaClinicaSeleccionada = null;
  }

  eliminarPaciente(numeroFicha: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.eliminarPaciente(numeroFicha).subscribe({
        next: () => {
          alert('Paciente eliminado correctamente.');
          this.cargarPacientes();
        },
        error: (err) => {
          console.error('Error al eliminar paciente:', err);
          alert('No se pudo eliminar el paciente.');
        }
      });
    }
  }

  // Pestaña actual

  // Cambiar la pestaña actual
  cambiarSeccion(seccion: string): void {
    this.currentSection = seccion;
  }

  // Agregar tratamiento farmacológico
  agregarTratamiento(): void {
    if (!this.historiaClinicaSeleccionada?.tratamientosFarmacologicos) {
      this.historiaClinicaSeleccionada.tratamientosFarmacologicos = [];
    }
    this.historiaClinicaSeleccionada.tratamientosFarmacologicos.push({
      medicamento: '',
      dosis: '',
      frecuencia: '',
      viaAdministracion: '',
      observaciones: ''
    });
  }

  // Eliminar tratamiento farmacológico
  eliminarTratamiento(index: number): void {
    this.historiaClinicaSeleccionada.tratamientosFarmacologicos.splice(index, 1);
  }


}
