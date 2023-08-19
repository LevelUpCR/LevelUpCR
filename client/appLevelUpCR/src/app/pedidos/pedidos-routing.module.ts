import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosVendedorComponent } from './pedidos-vendedor/pedidos-vendedor.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {
    path: 'pedidos',
    component: PedidosIndexComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos/cliente',
    component: PedidosClienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos/cliente/:id',
    component: PedidosClienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos/vendedor',
    component: PedidosVendedorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos/vendedor/:id',
    component: PedidosVendedorComponent,
    canActivate: [AuthGuard],
  },
  /*{path:'pedidos/all', component: PedidosAllComponent,
    canActivate: [AuthGuard],
    data: {
      habilitado: [true],
    },},
  {path:'pedidos/create', component: PedidosFormComponent,
    canActivate: [AuthGuard],
    data: {
      habilitado: [true],
    },},
  {path:'pedidos/:id', component: PedidosDetailComponent,
    canActivate: [AuthGuard],
    data: {
      habilitado: [true],
    },},
  {path:'pedidos/update/:id', component: PedidosFormComponent,
    canActivate: [AuthGuard],
    data: {
      habilitado: [true],
    },},*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
