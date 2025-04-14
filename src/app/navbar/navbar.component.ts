import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router:Router){}
  navegar(ruta:string){
    this.router.navigate([`/${ruta}`])
  }

  eliminar(){
    localStorage.clear();
  }
}
