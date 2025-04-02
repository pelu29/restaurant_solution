import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-t',
  imports: [],
  templateUrl: './login-t.component.html',
  styleUrl: './login-t.component.css'
})
export class LoginTComponent {
  constructor(private router:Router){}

  navegar(ruta:string){
    this.router.navigate([`/${ruta}`])
  }
}
