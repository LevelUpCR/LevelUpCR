import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosVendedorComponent } from './pedidos-vendedor/pedidos-vendedor.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';

const routes: Routes = [
  { path: 'pedidos', component: PedidosIndexComponent },
  { path: 'pedidos/cliente/', component: PedidosClienteComponent },
  { path: 'pedidos/cliente/:id', component: PedidosClienteComponent},
  { path: 'pedidos/vendedor', component: PedidosVendedorComponent },
  { path: 'pedidos/vendedor/:id', component: PedidosVendedorComponent },
  /*{path:'pedidos/all', component: PedidosAllComponent},
  {path:'pedidos/create', component: PedidosFormComponent},
  {path:'pedidos/:id', component: PedidosDetailComponent},
  {path:'pedidos/update/:id', component: PedidosFormComponent},*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
