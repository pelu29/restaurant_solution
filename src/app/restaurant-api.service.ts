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

  consultarPedido(id_mesa: number): Observable<any> {
    const datos = { id_mesa };
    return this.http.post(`${this.baseUrl}/pedidos/consultarPedido`, datos)
  }

  // Función para hacer login
  login(correo: string, contraseña: string): Observable<any> {
    const body = { correo, contraseña };
    return this.http.post(`${this.baseUrl}/trabajadores/login`, body);
  }

  // Guardar token en localStorage
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener token desde localStorage
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Eliminar token de localStorage
  eliminarToken(): void {
    localStorage.removeItem('token');
  }

  // Función para validar el token (puedes modificarla según tu lógica de validación)
  static isTokenValido(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
      const now = Math.floor(Date.now() / 1000); // Obtiene el tiempo actual en segundos
      return payload.exp > now; // Verifica si el token no ha expirado
    } catch (error) {
      return false; // Si hay error al decodificar el token, no es válido
    }
  }

}
