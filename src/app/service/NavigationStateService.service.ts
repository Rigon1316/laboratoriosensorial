import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {
  private canAccessHistoriaClinica: boolean = false;

  permitirAccesoHistoriaClinica(): void {
    this.canAccessHistoriaClinica = true;
  }

  denegarAccesoHistoriaClinica(): void {
    this.canAccessHistoriaClinica = false;
  }

  puedeAccederHistoriaClinica(): boolean {
    return this.canAccessHistoriaClinica;
  }
  
}
