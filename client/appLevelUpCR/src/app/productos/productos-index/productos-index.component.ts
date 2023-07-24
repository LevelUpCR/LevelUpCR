import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ProductosDiagComponent } from '../productos-diag/productos-diag.component';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-productos-index',
  templateUrl: './productos-index.component.html',
  styleUrls: ['./productos-index.component.css'],
})
export class ProductosIndexComponent {
  datos: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();
  tarjetasPorPagina = 4;
  paginaActual = 1;
  constructor(private gService: GenericService, private dialog: MatDialog,private cartService:CartService,
    private notificacion:NotificacionService) {
    this.listaProductos();
  }
  //Listar los videojuegos llamando al API
  listaProductos() {
    //localhost:3000/productos
    this.gService
      .list('productos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }
  detalleProducto(id: number) {
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductosDiagComponent, dialogConfig);
  }
  comprar(id:number){
    this.gService
    .get('productos',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar videojuego obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.notificacion.mensaje('Orden', 'Producto: '+data.nombre+' agregado a la orden', TipoMessage.success)
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
