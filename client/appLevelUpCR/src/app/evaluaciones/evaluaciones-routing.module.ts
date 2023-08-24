import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { EvalucionesClienteComponent } from "./evaluciones-cliente/evaluciones-cliente.component";
import { EvalucionesVendedorComponent } from "./evaluciones-vendedor/evaluciones-vendedor.component";
import { EvalucionesFormClienteComponent } from "./evaluciones-form-cliente/evaluciones-form-cliente.component";
import { EvalucionesFormVendedorComponent } from "./evaluciones-form-vendedor/evaluciones-form-vendedor.component";


const routes: Routes = [
  // {
  //   path: 'evaluaciones/cliente',
  //   component: EvalucionesClienteComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     roles:['Cliente']
  //   },
  // },
  {
    path: 'evaluaciones/vendedor',
    component: EvalucionesVendedorComponent,
    canActivate: [AuthGuard],
    data: {
      roles:['Vendedor']
    },
  },
  {
    path: 'evaluaciones/cliente/create',
    component: EvalucionesFormClienteComponent,
    canActivate: [AuthGuard],
    data: {
      roles:['Cliente']
    },
  },
  {
    path: 'evaluaciones/vendedor/create',
    component: EvalucionesFormVendedorComponent,
    canActivate: [AuthGuard],
    data: {
      roles:['Vendedor']
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvalucionesRoutingModule {}
