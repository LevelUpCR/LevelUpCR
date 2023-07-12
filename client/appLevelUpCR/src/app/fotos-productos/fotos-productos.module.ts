import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { FotosProductosRoutingModule } from './fotos-productos-routing.module';
import { FotosProductosAllComponent } from './fotos-productos-all/fotos-productos-all.component';


@NgModule({
  declarations: [
    FotosProductosAllComponent
  ],
  imports: [
    CommonModule,
    FotosProductosRoutingModule,
    MatTableModule,
    MatCardModule
  ]
})
export class FotosProductosModule { }
