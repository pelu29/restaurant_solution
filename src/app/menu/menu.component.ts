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

  imagenes: any[] = [
    {
      "Entradas": [
        "https://imgs.search.brave.com/p0SpiYxdazaytPPFvTtSjxstdpPkq79vENZg2eVg5q4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2xhcmluLmNvbS9p/bWcvMjAyMS8wNC8x/NS93Q3J6RHlXZXdf/NzIweDBfXzEuanBn",
        "https://imgs.search.brave.com/gdmanbuHVSgXZ9jgsLSiVUpsjSHb4wXVvbkiWCqiEaQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVjZXRhc2RlcmVj/aHVwZXRlLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNS8w/Mi9QYXBhLWEtbGEt/aHVhbmNhaWFuYS1w/b3J0YWRhLTEtMTIw/MHg4MjguanBn",
        "https://imgs.search.brave.com/cQnQNhzQZ_xFXTvtk3xKNTgDKpl7ROe23oB9AwKlRLI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/LmJvbnZpdmV1ci5j/b20vdG9zdG9uZXMt/by1wYXRhY29uZXMt/ZGUtcGxhdGFuby1t/YWNoby5qcGc",
        "https://imgs.search.brave.com/_SIPwiflNcMMggQkatcw_HdHbhZ1iqvDFx9Nxx4J8ns/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdt/ZWRpYS5idWVuYXpv/LnBlLzY0MHgzNzEv/YnVlbmF6by9vcmln/aW5hbC8yMDIzLzA1/LzI0LzY0NmUzNGIx/NDMzOWYxNjcyODA2/NjFkOC5wbmc",
        "https://imgs.search.brave.com/CsYVZ8oJ6QNC9fFCwlaLndPEp_BPOHNIXUfXl3x5HtI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzgyLzQ5LzU4/LzM2MF9GXzU4MjQ5/NTgzN184TFpORGp4/RXlGWWg1czdhS3Zn/Q2xtOHlQR3RpaWh3/Zy5qcGc",
        "https://imgs.search.brave.com/gJKMYQnWqLepOZGL3xwdQRK8hE2WzN7PNtsMsR57vEE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vcmln/aW4uY3Jvbm9zbWVk/aWEuZ2xyLnBlL2xh/cmdlLzIwMjIvMDEv/MTcvbGdfNjFlNWM3/NTQ1YzZhN2Q1YjJl/NzBjMDgzLmpwZw"
      ],

      "Criollos": [
        "https://imgs.search.brave.com/HPbsg_QEhwEep5OAdpAV58Hg4rdXcjEHaTHzJGzux3M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tb2pv/LmdlbmVyYWxtaWxs/cy5jb20vYXBpL3B1/YmxpYy9jb250ZW50/LzVnMTdyU1k0R2tP/UV96YmNBM2V4cUFf/Z21pX2hpX3Jlc19q/cGVnLmpwZWc_dj1m/NTI0ZjdhYSZ0PTE2/ZTNjZTI1MGYyNDQ2/NDhiZWYyOGM1OTQ5/ZmI5OWZm",
        "https://imgs.search.brave.com/dDRqwMH7qFjy-miLtJQ2PrG4UIBVs1khaQRNi86-syE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9qYW1l/YXBlcnUuY29tL2Fz/c2V0cy9pbWFnZXMv/YWppLWRlLWdhbGxp/bmFfODAweDUzNC53/ZWJw",
        "https://imgs.search.brave.com/7IrlERAmX3TtMKNhXTprGgoDhldDrEnOdOSsWUUT8T8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vcmln/aW4uY3Jvbm9zbWVk/aWEuZ2xyLnBlL2xh/cmdlLzIwMjQvMDUv/MDIvbGdfNjYzM2Ji/OGJlZDdmZWQ1YTgw/MWE4YmIwLmpwZw",
        "https://imgs.search.brave.com/hfBJlYpFaS_Ahdf_PvWPCFidUyRoVwWFY2c66G6nQ80/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3JhbmphZGVvcm8u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE2LzA2L1RpbGFw/aWEtYS1sby1tYWNo/by0xLmpwZw",
        "https://imgs.search.brave.com/YC5jpkUUokajoKTF-mxgkQiyMHCCf26EiDouTulUZSM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGVl/bWl0aW1hZ2VzLmNv/bS82NDB4MC9odHRw/czovL3N0ZWVtaXRp/bWFnZXMuY29tL0RR/bVZFMjcxdzFianNa/TlNHd0gyN2FQTXY1/a3RzY1daVld0N1R0/R2JCd0pFc2lOL0Nh/dXNhJTIwRGVmJTIw/Ny5qcGc",
        "https://imgs.search.brave.com/W6YoTUpynPCT8PR_cbinQ8WvTC6g-F_tCdmYWawsvRI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGFyaW5nZ291cm1l/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTMvMDkvUG9s/bG8tYS1sYS1CcmFz/YS1SZWNpcGUtNi5q/cGc"
      ],

      "Bebidas": [
        "https://imgs.search.brave.com/IKhfvcTdgIyFZAvLssrL1VfB_SW7F1mtq1pmF4rzPgo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/LmJvbnZpdmV1ci5j/b20vY2hpY2hhLW1v/cmFkYS5qcGc",
        "https://imgs.search.brave.com/wMwse73CzgxpfCjXEQjGZBgLgvKOA0wevdVqUE_vius/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ1Lzk4/LzFjLzQ1OTgxYzIx/MGQxNWI0OGU2YmQ5/YTI2ZmJjNzc1YWUz/LmpwZw",
        "https://imgs.search.brave.com/ZdbXTo3eNz2BoObHb1Oxa6S14Nvmqdaz4fmZAd0tSvE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saXJw/LmNkbi13ZWJzaXRl/LmNvbS81ODZmYjA0/Ny9kbXMzcmVwL211/bHRpL29wdC9qdWdv/K3NpbXBsZStkZStt/YXJhY3V5YS0xOTIw/dy5qcGc",
        "https://imgs.search.brave.com/Qc_Kxdy72wqykv4HBeVzZhp1wzHtZ3ABffY5vtA4O5E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS50dWFzYXVkZS5j/b20vbWVkaWEvYXJ0/aWNsZS9nby9qaC9z/dWNvLWRlLWxhcmFu/amFfNjczMjQuanBn/P3dpZHRoPTY4NiZo/ZWlnaHQ9NDg3",
        "https://elcausape.com/wp-content/uploads/2021/02/el-causa-food-truck-Inka-Kola.jpg",
        "https://imgs.search.brave.com/qMSTJYX-XUGXxAKiY5aqFTZm8iqsUlRHg2KFMtTYK7w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/NjM2ODQ2L3Bob3Rv/L2ZpenouanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPU1Vem5z/dFRCQ0QyLVVKNEdG/eFd2SkRHa2w4SWdq/Qml6aklVUjhUUHE0/LVk9"
      ],

      "Postres": [
        "https://imgs.search.brave.com/XpX9K-waFIyXRcJrLvVgGLOuXV_o7qwwiwO8rPS2FKM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVjZXRhc2RlcmVj/aHVwZXRlLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8w/OC9MZW1vbi1QaWUu/anBn",
        "https://imgs.search.brave.com/pBreqdPWyBlAjEWqynnBYeIbbMr90kVPoNAkOx3rhKU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzMwLzU4LzIz/LzM2MF9GXzMwNTgy/MzgwXzM1VVRmT0hG/UkpIRTdvODJuVDB1/dmxXdzBMRUpzZFls/LmpwZw",
        "https://imgs.search.brave.com/D1RuTn_LWJ5LFkHMupQ2wUUDbWIMIyx-a-xD3gtz3aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZXJ1/ZGVsaWdodHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzAxL1BpY2Fyb25l/cy0xMDI0eDc2OC5q/cGc",
        "https://imgs.search.brave.com/cH400KdF45zu6wVr84LPgxsACu1x7tLNlSmDgA3s5PU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZW9w/bGVlbmVzcGFub2wu/Y29tL3RobWIvTzRi/QWVBbDVPWHRSckdQ/bXRDc0hoNFVwekRN/PS8xNTAweDAvZmls/dGVyczpub191cHNj/YWxlKCk6bWF4X2J5/dGVzKDE1MDAwMCk6/c3RyaXBfaWNjKCkv/cmVjZXRhcy0xMDky/LWFycm96LWNvbi1s/ZWNoZS0yMDAwLWFj/MTQ4NTg0NjUwODQ4/OGU4ZGE5NWY1Zjlj/OGRlNzkzLmpwZw",
        "https://imgs.search.brave.com/DkBFsQzcvLcn2wHgZ70E1c11pYBPfCrG98h_p1OqVAs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlc3BydWNlZWF0/cy5jb20vdGhtYi93/Vm56MnZWZ05QSWQy/R2V0TWg3Zko2cnJJ/amc9LzE1MDB4MC9m/aWx0ZXJzOm5vX3Vw/c2NhbGUoKTptYXhf/Ynl0ZXMoMTUwMDAw/KTpzdHJpcF9pY2Mo/KS9MdWN1bWFJY2VD/cmVhbS1HZXR0eUlt/YWdlcy0xNzE1NzE3/OTUtNTkyZDdkMTgz/ZGY3OGNiZTdlMGRi/OGJjLmpwZw",
        "https://imgs.search.brave.com/uKYwRSn30DzCd4LR7K4YU-xBmpCd6SvvfIIdQ71ypP8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGF1bGluYWNvY2lu/YS5uZXQvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMDUvcmVj/ZXRhLWRlLXN1c3Bp/cm8tbGltZW5vLVBh/dWxpbmEtQ29jaW5h/LVJlY2V0YXMtQ29j/aW5hLTgwMHg0NTAu/anBn"
      ]
    }
  ]

  constructor(private api: RestaurantApiService) { }

  // Modificado para asignar imágenes por índice
  obtenerImagen(categoria: string, index: number): string {
    // Buscar las imágenes de la categoría seleccionada
    const categoriaImagenes = this.imagenes.find(item => item[categoria]);
    if (categoriaImagenes) {
      const imagenesCategoria = categoriaImagenes[categoria];
      // Retornar la imagen correspondiente al índice del plato
      return imagenesCategoria[index % imagenesCategoria.length];
    }
    return 'default-image-url.jpg'; // Imagen por defecto en caso de que no haya imágenes
  }

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

    // Creamos el objeto con la información que queremos guardar
    const boleta = {
      numeroMesa: this.numeroMesa,
      carrito: this.carrito,
      total: this.totalCarrito()
    };

    // Guardamos la boleta en el localStorage bajo la clave 'pedido-mesa-{numeroMesa}'
    localStorage.setItem(`pedido-mesa-${this.numeroMesa}`, JSON.stringify(boleta));

    // Mostrar mensaje de confirmación (opcional)
    alert('Pedido confirmado y guardado');
  }


}