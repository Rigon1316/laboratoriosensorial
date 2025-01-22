import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavigationStateService } from '../service/NavigationStateService.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaGuard implements CanActivate {

  constructor(
    private navigationStateService: NavigationStateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.navigationStateService.puedeAccederHistoriaClinica()) {
      this.navigationStateService.denegarAccesoHistoriaClinica(); // Reseteamos el acceso
      return true;
    }

    alert('Acceso denegado. Solo se puede acceder desde el proceso de creación de un paciente.');
    this.router.navigate(['/home']);
    return false;
  }
}
