import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosIndexComponent } from './productos-index/productos-index.component';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { ProductosVendedorComponent } from './productos-vendedor/productos-vendedor.component';
import { ProductosCreateImageComponent } from './productos-create-image/productos-create-image.component';
import { AuthGuard } from '../share/guards/auth.guard';

//locahost:3000/videojuego/all
const routes: Routes = [
  {
    path: 'productos',
    component: ProductosIndexComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'productos/all',
    component: ProductosAllComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos/vendedor/:id',
    component: ProductosVendedorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN'], //roles:['ADMIN','USER'] Iguales al enum
    },
  },
  {
    path: 'productos/vendedor',
    component: ProductosVendedorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Vendedor'], //roles:['ADMIN','USER'] Iguales al enum
    },
  },

  {
    path: 'productos/create',
    component: ProductosFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos/createFoto',
    component: ProductosCreateImageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'productos/:id',
    component: ProductosDetailComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'productos/update/:id',
    component: ProductosFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
