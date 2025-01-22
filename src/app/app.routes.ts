import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AgregarUsuarioComponent } from './usuarios/agregar-usuario/agregar-usuario.component';
import { HomeComponent } from './home/home/home.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { AgregarPacienteComponent } from './pacientes/agregar-paciente/agregar-paciente.component';
import { ListarPacientesComponent } from './pacientes/listar-paciente/listar-paciente.component';
import { HistoriaClinicaComponent } from './pacientes/crear-historia-clinica/crear-historia-clinica.component';
import { HistoriaClinicaGuard } from './auth/HistoriaClinicaGuard.guard';
import { HistoriaClinicaCanDeactivateGuard } from './auth/historia-clinica-can-deactivate.guard';
import { ListarAsignacionesComponent } from './asignaciones/listar-asignaciones/listar-asignaciones.component';
import { AgregarAsignacionesComponent } from './asignaciones/agregar-asignaciones/agregar-asignaciones.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios/agregar', component: AgregarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/listar', component: ListarUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'pacientes/agregar', component: AgregarPacienteComponent, canActivate: [AuthGuard] },
  { path: 'pacientes/listar', component: ListarPacientesComponent, canActivate: [AuthGuard] },
  { path: 'historia-clinica/:numeroFicha', component: HistoriaClinicaComponent, canActivate: [HistoriaClinicaGuard, AuthGuard], canDeactivate: [HistoriaClinicaCanDeactivateGuard] },
  { path: 'asignaciones/listar', component: ListarAsignacionesComponent, canActivate: [AuthGuard] },
  { path: 'asignaciones/agregar', component: AgregarAsignacionesComponent, canActivate: [AuthGuard] },
  { path: 'seguimientos', component: SeguimientoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];