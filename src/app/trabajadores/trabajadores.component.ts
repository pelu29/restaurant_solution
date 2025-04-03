import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Importa CommonModule solo si es Standalone

@Component({
  selector: 'app-trabajadores',
  standalone: true,  // Esto es importante para el modo Standalone
  imports: [CommonModule],  // Importa CommonModule para usar *ngFor
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {
  // Cambiar 'any' por 'any[]' para indicar que se trata de un arreglo de objetos
  data: any[] = [];  // Declarar como un arreglo vacío para evitar posibles errores

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();  // Llamar a fetchData en ngOnInit
  }

  fetchData() {
    // Especificar que se espera un arreglo de objetos con la respuesta
    this.http.get<any[]>("https://restaurant-api-gold.vercel.app/api/pedidos")
      .subscribe({
        next: (respuesta) => {
          this.data = respuesta;  // Asignar la respuesta a la variable `data`
          console.log(this.data);  // Mostrar la respuesta en la consola
        },
        error: (err) => {
          console.error('Error al obtener los pedidos:', err);  // Manejo de error
        },
        complete: () => {
          console.log('La solicitud se completó exitosamente');  // Mensaje cuando la solicitud termine
        }
      });
  }
}