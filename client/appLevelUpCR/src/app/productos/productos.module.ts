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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProductosCreateImageComponent } from './productos-create-image/productos-create-image.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FotosProductosAllComponent } from '../fotos-productos/fotos-productos-all/fotos-productos-all.component';


@NgModule({
  declarations: [
    ProductosIndexComponent,
    ProductosDetailComponent,
    ProductosDiagComponent,
    ProductosAllComponent,
    ProductosFormComponent,
    ProductosVendedorComponent,
    ProductosCreateImageComponent,

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
    MatButtonToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule, //Gestionar Formularios
  ]
})
export class ProductosModule { }
