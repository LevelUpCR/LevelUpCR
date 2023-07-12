import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotosProductosAllComponent } from './fotos-productos-all/fotos-productos-all.component';

const routes: Routes = [
  {path:'fotosproductos/all', component: FotosProductosAllComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotosProductosRoutingModule { }
