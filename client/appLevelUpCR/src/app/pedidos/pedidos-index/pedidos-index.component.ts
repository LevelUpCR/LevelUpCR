import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html',
  styleUrls: ['./pedidos-index.component.css']
})
export class PedidosIndexComponent implements OnInit {

  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  //Tabla
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal','acciones'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.cartService.currentDataCart$.subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
   })
   this.total=this.cartService.getTotal();
   console.log(this.dataSource)
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Orden','Cantidad Actualizada '+item.cantidad,TipoMessage.info)
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Orden','Producto Eliminado',TipoMessage.warning)
  }
  registrarOrden() {
   if(this.cartService.getItems!=null){
    let itemsCarrito=this.cartService.getItems;
    //Armar la estructura de la tabla intermedia
    //[{videojuegoId:valor,cantidad:valor}]
    console.log(itemsCarrito)
    let detalles=itemsCarrito.map(
      x=>({
        ['productoId']:x.idItem,
        ['cantidad']:x.cantidad,
        ['estadoPedidoId']:1
      })
      //Datos para el API
      
    )
    let infoOrden={
        'fechaOrden': new Date(this.fecha),
        'productos':detalles,
        'total':this.total
    }
    console.log(infoOrden)
    this.gService.create('pedidos',infoOrden)
    .subscribe((respuesta:any)=>{
      this.noti.mensaje('Orden','Orden Registrada #'+respuesta.id,TipoMessage.success)
      this.cartService.deleteCart();
      this.total=this.cartService.getTotal();
      console.log(respuesta)

    })
   }else{
    this.noti.mensaje('Orden','Agregue Productos a la orden',TipoMessage.warning)
   }
  }
}
