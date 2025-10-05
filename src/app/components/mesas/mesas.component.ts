import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesas',
  imports: [],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {

  constructor(private router:Router){}

  navegar(ruta:string){
    this.router.navigate([`/${ruta}`])
  }
}
