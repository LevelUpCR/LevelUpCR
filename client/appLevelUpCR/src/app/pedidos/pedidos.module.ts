import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosDiagComponent } from './pedidos-diag/pedidos-diag.component';
import { PedidosVendedorComponent } from './pedidos-vendedor/pedidos-vendedor.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';
import { PedidosDiagVendedorComponent } from './pedidos-diag-vendedor/pedidos-diag-vendedor.component';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';


@NgModule({
  declarations: [
    PedidosIndexComponent,
    PedidosDiagComponent,
    PedidosVendedorComponent,
    PedidosClienteComponent,
    PedidosDiagVendedorComponent,
    PedidosAllComponent
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
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, //Gestionar Formularios
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule, 
  ]
})
export class PedidosModule { }
