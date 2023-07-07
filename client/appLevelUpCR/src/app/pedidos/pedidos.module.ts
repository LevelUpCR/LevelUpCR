import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosDiagComponent } from './pedidos-diag/pedidos-diag.component';
import { PedidosVendedorComponent } from './pedidos-vendedor/pedidos-vendedor.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';


@NgModule({
  declarations: [
    PedidosIndexComponent,
    PedidosDiagComponent,
    PedidosVendedorComponent,
    PedidosClienteComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
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
export class PedidosModule { }