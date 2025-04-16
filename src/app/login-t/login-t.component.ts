import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantApiService } from '../restaurant-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-t',
  imports: [FormsModule],
  templateUrl: './login-t.component.html',
  styleUrl: './login-t.component.css'
})
export class LoginTComponent {
  correo:string = '';
  contrasena:string = '';

  constructor(private router:Router,private api:RestaurantApiService){}

  iniciarSesion() {
    console.log(this.correo)
    console.log(this.contrasena)
    this.api.login(this.correo, this.contrasena).subscribe(
      (res: any) => {
        if (res.token) {
          console.log(res)
          localStorage.setItem('token', res.token); // Guardamos el token
          this.router.navigate(['/trabajadores'])
        } else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión');
      }
    );
  }
}
