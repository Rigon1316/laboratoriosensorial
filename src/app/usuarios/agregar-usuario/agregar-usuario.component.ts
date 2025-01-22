import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  cedula: string;
  nombre: string;
  ['contraseña']: string; // Definimos explícitamente con corchetes
  estado: string;
  rol: string;
}

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {
  usuario: Usuario = {
    cedula: '',
    nombre: '',
    ['contraseña']: '',
    estado: 'ACTIVO',
    rol: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  agregarUsuario() {
    this.usuarioService.agregarUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario agregado correctamente', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al agregar usuario:', error.error);
      }
    });
  }

}
