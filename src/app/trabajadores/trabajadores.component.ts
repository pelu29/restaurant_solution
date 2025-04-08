import { Component, OnInit } from '@angular/core';
import { RestaurantApiService } from '../restaurant-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {
  data: any[] = [];

  constructor(private api: RestaurantApiService) { }

  ngOnInit(): void {
    // Recuperamos los pedidos para mostrarlos en la tabla
    this.api.getPedidos().subscribe((datos) => {
      this.data = datos;
      console.log(this.data);
    });
  }

  // Actualizamos el estado del pedido según la selección en el select
  actualizarEstado(pedido: any): void {
    console.log('Estado del pedido antes de actualizar:', pedido.estado);
    console.log('ID del pedido:', pedido.id_pedido);

    // Llamamos a la API para actualizar el estado en el backend
    if (pedido.estado === 'En Cocina') {
      this.api.editarEstadoEncocina(pedido.id_pedido).subscribe(
        (response) => {
          console.log('Estado actualizado a "En Cocina":', response);
        },
        (error) => {
          console.error('Error al actualizar el estado a "En Cocina":', error);
        }
      );
    } else if (pedido.estado === 'En Camino') {
      this.api.editarEstado(pedido.id_pedido).subscribe(
        (response) => {
          console.log('Estado actualizado a "En Camino":', response);
        },
        (error) => {
          console.error('Error al actualizar el estado a "En Camino":', error);
        }
      );
    } else if (pedido.estado === 'Entregado') {
      this.api.editarEstadoEntregado(pedido.id_pedido).subscribe(
        (response) => {
          console.log('Estado actualizado a "Entregado":', response);
        },
        (error) => {
          console.error('Error al actualizar el estado a "Entregado":', error);
        }
      );
    } else if (pedido.estado === 'Pendiente') {
      // Si el estado es "Pendiente", podrías tener una lógica aquí, si es necesario
      console.log('Estado ya está como "Pendiente".');
    }
  }
}