import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosIndexComponent } from './productos-index/productos-index.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { ProductosDiagComponent } from './productos-diag/productos-diag.component';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatSelectModule } from '@angular/material/select';
import { ProductosVendedorComponent } from './productos-vendedor/productos-vendedor.component';


@NgModule({
  declarations: [
    ProductosIndexComponent,
    ProductosDetailComponent,
    ProductosDiagComponent,
    ProductosAllComponent,
    ProductosFormComponent,
    ProductosVendedorComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule, //Gestionar Formularios
  ]
})
export class ProductosModule { }
