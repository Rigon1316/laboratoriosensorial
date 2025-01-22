import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../../service/asignacion.service';
import { PacienteService } from '../../service/paciente.service';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-asignaciones',
  templateUrl: './agregar-asignaciones.component.html',
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./agregar-asignaciones.component.css']
})
export class AgregarAsignacionesComponent implements OnInit {
  pacientes: any[] = [];
  profesionales: any[] = [];
  asignacion = {
    numeroFicha: null,
    cedulaProfesional: ''
  };
  filtroPaciente: string = ''; // Nueva propiedad para filtrar pacientes
  filtroProfesional: string = ''; // Nueva propiedad para filtrar profesionales
  error: string = '';

  constructor(
    private asignacionService: AsignacionService,
    private pacienteService: PacienteService,
    private usuarioService: UsuarioService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarProfesionales();
  }

  /**
   * Cargar la lista de pacientes.
   */
  cargarPacientes(): void {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
        this.error = 'No se pudieron cargar los pacientes.';
      }
    });
  }

  /**
   * Cargar la lista de profesionales.
   */
  cargarProfesionales(): void {
    this.usuarioService.obtenerProfesionales().subscribe({
      next: (data) => {
        this.profesionales = data;
      },
      error: (err) => {
        console.error('Error al cargar profesionales:', err);
        this.error = 'No se pudieron cargar los profesionales.';
      }
    });
  }

  /**
   * Crear una nueva asignación.
   */
  guardarAsignacion(): void {
    this.asignacionService.crearAsignacion(this.asignacion).subscribe({
      next: (response: string) => {
        // Maneja la respuesta como texto plano
        alert(response); // Muestra el mensaje "Asignación creada correctamente"
      },
      error: (err) => {
        console.error('Error al guardar la asignación:', err);
        alert('No se pudo guardar la asignación.');
      },
    });
  }


}
