import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { EvalucionesFormClienteComponent } from '../evaluciones-form-cliente/evaluciones-form-cliente.component';

@Component({
  selector: 'app-evaluciones-diag-cliente',
  templateUrl: './evaluciones-diag-cliente.component.html',
  styleUrls: ['./evaluciones-diag-cliente.component.css'],
})
export class EvalucionesDiagClienteComponent {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource = new MatTableDataSource<any>();
  evaluaciones: any;
  displayedColumns = ['marca', 'calificacion'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<EvalucionesDiagClienteComponent>,
    private gService: GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerProductos(this.datosDialog.id);
      this.obtenerEvaluacionesXPedido(this.datosDialog.id);
    }
  }

  obtenerEvaluacionesXPedido(id: any) {
    this.gService
      .get('evaluacion/pedido', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.evaluaciones = data;
      });
  }

  obtenerProductos(id: any) {
    this.gService
      .get('pedidos', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        const uniqueUsuarioIds = new Set();
        const uniqueProductos = data.productos.filter((producto: any) => {
          if (!uniqueUsuarioIds.has(producto.productos.usuarioId)) {
            uniqueUsuarioIds.add(producto.productos.usuarioId);
            return true;
          }
          return false;
        });

        this.datos = { ...data, productos: uniqueProductos };
        this.dataSource = new MatTableDataSource(this.datos.productos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }



  crearCalificacion(id: number, idUsuario: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
      calificadoId: idUsuario,
    };
    const dialogRef = this.dialog.open(EvalucionesFormClienteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {

      this.obtenerEvaluacionesXPedido(this.datosDialog.id);
    });
  }

  hayEvaluacion(idUsuario: number): boolean {
    const evaluacionesFiltradas = this.evaluaciones.filter(
      (evaluacion) => evaluacion.calificadoId === idUsuario
    );
    if (evaluacionesFiltradas.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}
