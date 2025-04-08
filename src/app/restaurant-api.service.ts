import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantApiService {

  private baseUrl = "https://restaurant-api-gold.vercel.app/api";

  constructor(private http: HttpClient) { }

  //obtener todos los platos
  getPlatos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/platos`)
  }

  // Actualiza la firma de insertarPedidos para aceptar un objeto con la estructura correcta
  insertarPedidos(datos: { id_mesa: number; platos: { id_plato: number }[] }): Observable<any> {
    return this.http.post(`${this.baseUrl}/pedidos/insertPedido`, datos);
  }

  //obtener todos los platos
  getPedidos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pedidos`)
  }

  editarEstado(id_pedido: number): Observable<any> {
    const datos = { id_pedido };  // Solo enviamos el id_pedido
    return this.http.post(`${this.baseUrl}/pedidos/enCamino`, datos);
  }

  editarEstadoEntregado(id_pedido: number): Observable<any> {
    const datos = { id_pedido };  // Solo enviamos el id_pedido
    return this.http.post(`${this.baseUrl}/pedidos/entregado`, datos);
  }

  editarEstadoEncocina(id_pedido: number): Observable<any> {
    const datos = { id_pedido };  // Solo enviamos el id_pedido
    return this.http.post(`${this.baseUrl}/pedidos/enCocina`, datos);
  }

}
