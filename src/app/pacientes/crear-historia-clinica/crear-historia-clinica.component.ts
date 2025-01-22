import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HistoriaClinicaService } from '../../service/historia-clinica.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanComponentDeactivate } from '../../auth/historia-clinica-can-deactivate.guard';

@Component({
  selector: 'app-crear-historia-clinica',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './crear-historia-clinica.component.html',
  styleUrls: ['./crear-historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit, CanComponentDeactivate {
  historiaClinica: any = {
    numeroFicha: null,
    enfermedadesTratamiento: false,
    descripcionEnfermedades: '',
    alergias: false,
    descripcionAlergias: '',
    intervencionesQuirurgicas: false,
    descripcionIntervenciones: '',
    tratamientos: [], // Cambiado a arreglo para manejar tratamientos
    desarrolloPrenatal: '',
    embarazoDeseado: false,
    controlEmbarazo: false,
    enfermedadesMadre: '',
    consumoToxicoMadre: '',
    amenazaAborto: false,
    estadoEmocionalMadre: '',
    desarrolloPerinatal: '',
    lugarNacimiento: '',
    duracionEmbarazo: '',
    tipoParto: '',
    complicacionesParto: '',
    desarrolloPosnatal: '',
    habilidadesMotoras: '',
    habilidadesLenguaje: '',
    controlCefalico: '',
    balbuceo: '',
    sedestacion: '',
    vocalizacion: '',
    bipedestacion: '',
    juegoVocal: '',
    gateo: '',
    silabeo: '',
    caminaConApoyo: '',
    primerasPalabras: '',
    caminaSolo: '',
    oracionesDosPalabras: '',
    subeEscaleras: '',
    oracionesTresPalabras: '',
    controlEsfinteres: '',
    formulacionLinguisticaCompleta: '',
    salta: '',
    numeroTotalPalabras: '',
    corre: ''
  };

  currentStep: number = 1; // Paso actual
  totalSteps: number = 7;  // Total de pasos

  datosGuardados: boolean = false; // Estado para saber si se han enviado los datos

  constructor(
    private historiaClinicaService: HistoriaClinicaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const numeroFicha = this.route.snapshot.paramMap.get('numeroFicha');
    if (numeroFicha) {
      this.historiaClinica.numeroFicha = parseInt(numeroFicha, 10);
    }
  }

  guardarHistoriaClinica(): void {
    if (!this.historiaClinica.numeroFicha) {
      alert('El número de ficha es obligatorio.');
      return;
    }

    this.historiaClinicaService.crearHistoriaClinica(this.historiaClinica).subscribe({
      next: () => {
        alert('Historia clínica registrada correctamente');
        this.datosGuardados = true; // Indicar que los datos ya fueron enviados
        this.router.navigate(['/pacientes']);
      },
      error: (err) => {
        console.error('Error al registrar historia clínica:', err);
        alert('Error al registrar historia clínica.');
      }
    });
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Métodos para manejar tratamientos
  agregarTratamiento(): void {
    this.historiaClinica.tratamientos.push({
      medicamento: '',
      dosis: '',
      frecuencia: '',
      viaAdministracion: '',
      observaciones: ''
    });
  }

  eliminarTratamiento(index: number): void {
    this.historiaClinica.tratamientos.splice(index, 1);
  }

  canDeactivate(): boolean {
    if (!this.datosGuardados) {
      return confirm('No has guardado los datos. Luego no podrás llenarlos. ¿Estás seguro de que quieres salir?');
    }
    return true;
  }
}
