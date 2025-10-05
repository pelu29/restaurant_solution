import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { MenuComponent } from './components/menu/menu.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { LoginTComponent } from './components/login-t/login-t.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'mesas', pathMatch: 'full' },
    { path: 'navbar', component: NavbarComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'mesas', component: MesasComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'trabajadores', component: TrabajadoresComponent, canActivate: [authGuard] }, // Ruta protegida
    { path: 'loginT', component: LoginTComponent },
    { path: 'misPedidos', component: MisPedidosComponent }
  ];
