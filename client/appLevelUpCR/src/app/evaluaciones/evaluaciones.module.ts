import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvalucionesRoutingModule } from "./evaluaciones-routing.module";
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EvalucionesClienteComponent } from './evaluciones-cliente/evaluciones-cliente.component';
import { EvalucionesVendedorComponent } from './evaluciones-vendedor/evaluciones-vendedor.component';
import { EvalucionesFormVendedorComponent } from './evaluciones-form-vendedor/evaluciones-form-vendedor.component';
import { EvalucionesFormClienteComponent } from './evaluciones-form-cliente/evaluciones-form-cliente.component';
import { EvalucionesDiagClienteComponent } from './evaluciones-diag-cliente/evaluciones-diag-cliente.component';


@NgModule({
  declarations: [
    EvalucionesClienteComponent,
    EvalucionesVendedorComponent,
    EvalucionesFormVendedorComponent,
    EvalucionesFormClienteComponent,
    EvalucionesDiagClienteComponent
  ],
  imports: [
    CommonModule,
    EvalucionesRoutingModule,
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
    MatCheckboxModule,
    ReactiveFormsModule, //Gestionar Formularios
  ]
})
export class EvaluacionesModule { }
