import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { ProductosDiagComponent } from '../productos-diag/productos-diag.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-productos-vendidos',
  templateUrl: './productos-vendidos.component.html',
  styleUrls: ['./productos-vendidos.component.css'],
})
export class ProductosVendidosComponent implements AfterViewInit {
  datos: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource = new MatTableDataSource<any>();
  pedidotrack: any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'vendedor',
    'nombre',
    /*'descripcion',*/
    'precio',
    'cantidad',
    'estado',
    'acciones',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private noti: NotificacionService,
    private authService: AuthenticationService
  ) {}

  ngAfterViewInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));

    let id = this.currentUser.user.idUsuario;

    if (!isNaN(Number(id))) {
      this.listaProductos(Number(id));
    }
  }
  listaProductos(id: number) {
    //localhost:3000/productos
    const vendedorId = id; //Cambiarlo a id, para que ahora si pueda funcionar con todos los vendedores
    this.gService
      .list(`pedidos/produped/${vendedorId}`)
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
    this.dialog.open(ProductosDiagComponent, dialogConfig);
  }

  actualizarProducto(id: number) {
    this.router.navigate(['/productos/update', id], {
      relativeTo: this.route,
    });
  }

  crearProducto() {
    this.router.navigate(['/productos/create'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  actualizarestado(row: any) {

    let track = row.pedidos.estadoPedidoId;
    this.gService
      .update2('pedidos/upproduped', row)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // Obtener respuesta
        this.noti.mensaje(
          'Pedido',
          'El estado del producto ' +
            data.productos.nombre +
            ' cambio a entregado',
          TipoMessage.success
        );

        // Deshabilitar el checkbox al finalizar la actualización
        row.estadoPedidoId = 2;
      });
    this.gService
      .get('pedidos/propedido', row.pedidoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((productos: any[]) => {

        // const deliveredCount = productos.reduce((count, producto) => {
        //   return count + (producto.estadoPedidoId === 2 ? 1 : 0);
        // }, 0);
        const allProductsDelivered = productos.every(
          (producto) => producto.estadoPedidoId === 1
        );
        if (allProductsDelivered&&productos.length>1) {
          const updatedPedido = { idPedido: row.pedidoId, estadoPedidoId: 3 };
          this.gService
            .update2('pedidos/upped', updatedPedido)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
              // Obtener respuesta
              this.noti.mensaje(
                'Pedido',
                'El pedido # ' + data.idPedido + ' cambio a en progreso',
                TipoMessage.success
              );
            });
          // Deshabilitar el checkbox al finalizar la actualización
          row.estadoPedidoId = 2;
          track = 3;
        } else {
          this.checkAndUpdatePedidoEstado(row.pedidoId);
        }
      });
  }

  checkAndUpdatePedidoEstado(pedidoId: number) {

    // Consultar los registros relacionados en la tabla pedidos_productos
    this.gService
      .get('pedidos/propedido', pedidoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((productos: any[]) => {

        // Verificar si todos los registros tienen estadoPedidoId igual a 2
        const allProductsDelivered = productos.every(
          (producto) => producto.estadoPedidoId === 2
        );

        if (allProductsDelivered) {
          // Actualizar el estado en la tabla de pedidos
          const updatedPedido = { idPedido: pedidoId, estadoPedidoId: 2 };

          this.gService
            .update2('pedidos/upped', updatedPedido)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
              // Obtener respuesta
              this.noti.mensaje(
                'Pedido',
                'El pedido # ' + data.idPedido + ' cambio a entregado',
                TipoMessage.success
              );
            });
        }
      });
  }
}
