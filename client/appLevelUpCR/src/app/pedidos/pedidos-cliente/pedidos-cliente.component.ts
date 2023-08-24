import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { PedidosDiagComponent } from '../pedidos-diag/pedidos-diag.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { EvalucionesDiagClienteComponent } from 'src/app/evaluaciones/evaluciones-diag-cliente/evaluciones-diag-cliente.component';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.css'],
})
export class PedidosClienteComponent implements AfterViewInit {
  datos: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cliente', 'estadopedido', 'total', 'acciones', 'calificacion'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {}

  ngAfterViewInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));

    this.listaPedidos();
  }
  listaPedidos() {
    //localhost:3000/pedidos/cliente/:id
    const clienteId = this.currentUser.user.idUsuario;
    //const clienteId = 1;
    this.gService
      .list(`pedidos/cliente/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {

        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

  }
  detalle(id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(PedidosDiagComponent, dialogConfig);
  }

  actualizarPedido(id: number) {
    this.router.navigate(['/pedidos/update', id], {
      relativeTo: this.route,
    });
  }

  crearPedido() {
    this.router.navigate(['/pedidos/create'], {
      relativeTo: this.route,
    });
  }

  crearCalificacion(id: number) {
    /* this.router.navigate(['/evaluaciones/cliente/create'], {
      relativeTo: this.route,
    }); */

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(EvalucionesDiagClienteComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}



