import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common'; // Añadir esta importación
import { HttpClient } from '@angular/common/http';
import { RestaurantApiService } from '../restaurant-api.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass, CommonModule],  // Añadir CommonModule aquí
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categorias: string[] = ['Entradas', 'Criollos', 'Bebidas', 'Postres'];
  categoriaSeleccionada: string = 'Criollos';
  platos: any[] = [];
  carrito: any[] = [];
  numeroMesa: number = 1;
  boletaGenerada: boolean = false;

  constructor(private api: RestaurantApiService) { }

  ngOnInit(): void {
    this.api.getPlatos().subscribe((data) => {
      this.platos = data;
      console.log(this.platos);
    });
  }

  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
  }

  agregarAlCarrito(plato: any) {
    // Asegúrate de que se agrega correctamente el id_plato
    this.carrito.push({
      id_plato: plato.id_plato,
      nombre_plato: plato.nombre_plato,
      precio: plato.precio
    });
  }

  eliminarDelCarrito(item: any) {
    this.carrito = this.carrito.filter((plato) => plato !== item);
  }

  totalCarrito(): number {
    return this.carrito.reduce((total, item) => total + parseFloat(item.precio), 0);
  }

  realizarPedido() {
    if (this.carrito.length === 0) {
      alert("No hay platos en el carrito.");
      return;
    }
    this.boletaGenerada = true;  // Mostrar la boleta al hacer el pedido
  }

  confirmarPedido() {
    if (this.carrito.length === 0) {
      alert("No hay platos en el carrito.");
      return;
    }
  
    const datosPedido = {
      id_mesa: this.numeroMesa,
      platos: this.carrito.map(item => ({
        id_plato: item.id_plato
      }))
    };
  
    console.log('Datos a enviar:', datosPedido);  // Verifica los datos antes de enviarlos
  
    this.api.insertarPedidos(datosPedido).subscribe(
      (response) => {
        console.log('Pedido realizado con éxito:', response);
        alert('Pedido realizado con éxito');
        this.carrito = [];
        this.boletaGenerada = false;
      },
      (error) => {
        console.error('Error al realizar el pedido:', error);
        alert('Hubo un problema al realizar el pedido.');
      }
    );
  }
}