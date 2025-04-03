import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-trabajadores',
  imports: [],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css'
})
export class TrabajadoresComponent implements OnInit{
  data:any;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    console.log(this.fetchData())
  }

  fetchData(){
    this.http.get("restaurant-api-gold.vercel.app/api/usuarios")
    .subscribe(respuesta=>{
      this.data = respuesta
      console.log(this.data)
    })
  }
}
