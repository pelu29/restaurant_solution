import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, FormsModule,NgClass],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  categorias: string[] = ['Entradas', 'Criollos', 'Bebidas', 'Postres'];
  categoriaSeleccionada: string = 'Criollos';

  platos = [
    {
      nombre: 'Lomo Saltado',
      precio: 25,
      categoria: 'Criollos',
      imagen: 'https://i.ytimg.com/vi/sWXRJbGi6yQ/hq720.jpg'
    },
    {
      nombre: 'Tallarines Rojos',
      precio: 20,
      categoria: 'Criollos',
      imagen: 'https://i.ytimg.com/vi/F1eKSg5aBtw/maxresdefault.jpg'
    },
    {
      nombre: 'Tallarines Verdes',
      precio: 22,
      categoria: 'Criollos',
      imagen: 'https://i.ytimg.com/vi/enxbUqDbq2g/maxresdefault.jpg'
    },
    {
      nombre: 'Seco de Pollo',
      precio: 22,
      categoria: 'Criollos',
      imagen: 'https://i.ytimg.com/vi/pUJD_FvAmQg/maxresdefault.jpg'
    },
    {
      nombre: 'Estofado',
      precio: 22,
      categoria: 'Criollos',
      imagen: 'https://jameaperu.com/assets/images/estofado-de-pollo_800x534.webp'
    },
    {
      nombre: 'Locro',
      precio: 22,
      categoria: 'Criollos',
      imagen: 'https://www.infobae.com/new-resizer/-_4smBja4GxT_2umpRGCdzMEdcQ=/arc-anglerfish-arc2-prod-infobae/public/6XMDYP5ZTNEN5LFFIGSY2XMCRA.jpg'
    },
    {
      nombre: 'Ceviche',
      precio: 22,
      categoria: 'Entradas',
      imagen: 'https://www.recetasnestle.cl/sites/default/files/srh_recipes/379d1ba605985c4bc3ea975cabacce13.jpg'
    },
    {
      nombre: 'Chanfainita',
      precio: 22,
      categoria: 'Criollos',
      imagen: 'https://portal.andina.pe/EDPfotografia/Thumbnail/2014/12/01/000271793W.jpg'
    },
    {
      nombre: 'Arroz con Pollo',
      precio: 22,
      categoria: 'Criollos',
      imagen: 'https://comidaperuana.org/wp-content/uploads/2023/12/receta-de-arroz-con-pollo-peruano.jpg'
    },
    {
      nombre: 'Inca Kola',
      precio: 5,
      categoria: 'Bebidas',
      imagen: 'https://inca-cola.com.pe/wp-content/uploads/2023/07/bebidas-inca-kola-500-ml.png'
    },
    {
      nombre: 'Chicha Morada',
      precio: 4,
      categoria: 'Bebidas',
      imagen: 'https://bodega.peru.com/166-home_default/chicha-morada-inka.jpg'
    },
    {
      nombre: 'Suspiro a la Limeña',
      precio: 8,
      categoria: 'Postres',
      imagen: 'https://cdn0.recetasgratis.net/es/posts/1/2/6/suspiro_a_la_limena_peruano_76621_orig.jpg'
    }
  ];

  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
  }
}