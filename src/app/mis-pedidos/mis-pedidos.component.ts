import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  numeroMesa: number = 0;
  numeroMesa2: number = 0;
  carrito: any[] = [];
  boletaGenerada: boolean = false;
  noPedidos: boolean = false;

  ngOnInit(): void {
    // No hacemos nada al inicio
  }

  recuperarPedido(numeroMesa: number) {
    const pedidoGuardado = localStorage.getItem(`pedido-mesa-${numeroMesa}`);

    if (pedidoGuardado) {
      const boleta = JSON.parse(pedidoGuardado);
      console.log('Pedido recuperado:', boleta);

      this.carrito = boleta.carrito;
      this.numeroMesa2 = boleta.numeroMesa;
      this.boletaGenerada = true;
      this.noPedidos = false;
    } else {
      console.log('No hay pedidos guardados para esta mesa.');

      // Limpiamos todo lo anterior si no hay pedido
      this.carrito = [];
      this.numeroMesa2 = numeroMesa;
      this.boletaGenerada = false;
      this.noPedidos = true;
    }
  }
}