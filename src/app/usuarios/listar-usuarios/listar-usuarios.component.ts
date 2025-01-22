import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableComponent } from '../../componetes/table/table.component';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    TableComponent
  ],
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: any[] = []; // Lista completa de usuarios
  usuariosFiltrados: any[] = []; // Lista filtrada de usuarios
  filtro: string = ''; // Almacena el término de búsqueda
  error: string = ''; // Almacena errores si ocurren
  usuarioAutenticadoCedula: string = ''; // Cédula del usuario autenticado

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerCedulaUsuarioAutenticado();
    this.cargarUsuarios();
  }

  /**
   * Obtiene la cédula del usuario autenticado desde el token JWT.
   */
  obtenerCedulaUsuarioAutenticado(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.usuarioAutenticadoCedula = decodedToken.sub; // "sub" contiene la cédula
    }
  }

  /**
   * Cargar la lista de usuarios desde el backend.
   */
  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        // Excluir al usuario autenticado
        this.usuarios = data.filter(usuario => usuario.cedula !== this.usuarioAutenticadoCedula);
        this.filtrarUsuarios();
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.error = 'No se pudo obtener la lista de usuarios.';
      }
    });
  }

  /**
   * Filtrar usuarios según el término ingresado.
   */
  filtrarUsuarios(): void {
    const termino = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.cedula.toLowerCase().includes(termino) ||
      usuario.nombre.toLowerCase().includes(termino) ||
      usuario.rol.toLowerCase().includes(termino) ||
      usuario.estado.toLowerCase().includes(termino)
    );
  }

  /**
   * Eliminar un usuario por su ID o cédula.
   * @param id ID del usuario a eliminar.
   * @param cedula Cédula del usuario a eliminar.
   */
  eliminarUsuario(id: number, cedula: string): void {
    if (cedula === this.usuarioAutenticadoCedula) {
      alert('No puedes eliminar tu propio usuario.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      const endpoint = id ? `/usuarios/${id}` : `/usuarios/cedula/${cedula}`;
      this.usuarioService.eliminarUsuario(endpoint).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
          this.filtrarUsuarios(); // Actualizar la lista filtrada
          alert('Usuario eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          this.error = 'No se pudo eliminar el usuario. Verifique permisos o el servidor.';
        }
      });
    }
  }
}
