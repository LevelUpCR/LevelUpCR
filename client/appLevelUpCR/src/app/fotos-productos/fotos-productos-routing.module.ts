import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotosProductosAllComponent } from './fotos-productos-all/fotos-productos-all.component';
import { FotosProductosFormComponent } from './fotos-productos-form/fotos-productos-form.component';

const routes: Routes = [
  {path:'fotosproductos/all', component: FotosProductosAllComponent},
  {path:'fotosproductos/form', component: FotosProductosFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotosProductosRoutingModule { }
