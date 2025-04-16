import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantApiService } from '../restaurant-api.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent{
  numeroMesa: number = 0;
  data:any[]=[]

  constructor(private apiService:RestaurantApiService){}

  recuperarPedido(n: number) {
      this.apiService.consultarPedido(n).subscribe((datos)=>{
      this.data = datos
      console.log(this.data)
    })
  }
}