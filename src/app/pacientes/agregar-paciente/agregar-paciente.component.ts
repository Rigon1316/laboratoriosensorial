import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../../service/paciente.service';
import { NavigationStateService } from '../../service/NavigationStateService.service'; // Inyección del servicio
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-paciente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent implements OnInit {
  paciente: any = {
    numeroFicha: null,
    nombresApellidos: '',
    lugarFechaNacimiento: '',
    edad: null,
    escolarizado: false,
    institucionEducativa: '',
    nivelEducativo: '',
    direccionDomiciliaria: '',
    fechaEntrevista: '',
    nombrePadre: '',
    edadPadre: null,
    ocupacionPadre: '',
    nombreMadre: '',
    edadMadre: null,
    ocupacionMadre: '',
    numeroHermanos: null,
    comportamiento: '',
    ambientesTranquilos: false,
    sensibilidadEstimulacion: false,
    distraccionRuidos: false,
    gustos: '',
    disgustos: '',
    separacionMadre: false,
    fechaRegistro: '' // Será configurada automáticamente en el ngOnInit
  };

  error: string = '';

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private navigationStateService: NavigationStateService // Inyección del servicio
  ) { }

  ngOnInit(): void {
    this.establecerFechaRegistro();
  }

  /**
   * Configura la fecha de registro automáticamente al momento de cargar el formulario.
   */
  establecerFechaRegistro(): void {
    const fechaActual = new Date();
    this.paciente.fechaRegistro = fechaActual.toISOString().split('T')[0];
  }

  /**
   * Guarda un nuevo paciente y redirige al formulario de historia clínica.
   */
  guardarPaciente(): void {
    this.pacienteService.crearPaciente(this.paciente).subscribe({
      next: (response) => {
        alert('Paciente registrado exitosamente');

        // Permitir acceso temporal a la creación de historia clínica
        this.navigationStateService.permitirAccesoHistoriaClinica();

        // Redirigir al formulario de historia clínica
        this.router.navigate([`/historia-clinica/${response.numeroFicha}`]);
      },
      error: (err) => {
        console.error('Error al registrar paciente:', err);
        alert('Error al registrar paciente');
      }
    });
  }

  /**
   * Valida que todos los campos obligatorios estén completos.
   */
  validarFormulario(): boolean {
    return this.paciente.numeroFicha &&
      this.paciente.nombresApellidos &&
      this.paciente.lugarFechaNacimiento &&
      this.paciente.edad &&
      this.paciente.escolarizado !== null &&
      this.paciente.nombrePadre &&
      this.paciente.edadPadre &&
      this.paciente.ocupacionPadre &&
      this.paciente.nombreMadre &&
      this.paciente.edadMadre &&
      this.paciente.ocupacionMadre &&
      this.paciente.numeroHermanos &&
      this.paciente.comportamiento &&
      this.paciente.gustos &&
      this.paciente.disgustos;
  }

  /**
   * Cancela la operación y vuelve a la lista de pacientes.
   */
  cancelar(): void {
    this.router.navigate(['/pacientes']);
  }
}
