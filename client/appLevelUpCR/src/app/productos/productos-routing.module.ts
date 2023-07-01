import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosIndexComponent } from './productos-index/productos-index.component';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';

 //locahost:3000/videojuego/all
 const routes: Routes = [
  {path:'productos', component: ProductosIndexComponent}, 

  {path:'productos/all', component: ProductosAllComponent},

  {path:'productos/create', component: ProductosFormComponent},

  {path:'productos/:id', component: ProductosDetailComponent},

  {path:'productos/update/:id', component: ProductosFormComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }







