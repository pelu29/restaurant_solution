import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MesasComponent } from './mesas/mesas.component';
import { MenuComponent } from './menu/menu.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { LoginTComponent } from './login-t/login-t.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';

export const routes: Routes = [
    {path:'',redirectTo:'mesas',pathMatch:'full'},
    {path:'navbar',component:NavbarComponent},
    {path:'footer',component:FooterComponent},
    {path:'mesas',component:MesasComponent},
    {path: 'menu', component:MenuComponent},
    {path:'trabajadores',component:TrabajadoresComponent},
    {path:'loginT',component:LoginTComponent},
    {path: 'misPedidos',component:MisPedidosComponent}
];
