import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html',
  styleUrls: ['./pedidos-index.component.css'],
})
export class PedidosIndexComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLinear = false;

  //Lista de direccion
  direccionList: any;
  metodosList: any;
  selectedAddress: any;
  selectedPayment: any;

  //Nombre del formulario
  pedidosForm: FormGroup;

  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  //Tabla
  displayedColumns: string[] = [
    'producto',
    'precio',
    'cantidad',
    'subtotal',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.listaDirecciones(1);
    this.listaMetodos(1);
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();
    console.log(this.dataSource);
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje(
      'Orden',
      'Cantidad Actualizada ' + item.cantidad,
      TipoMessage.info
    );
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Orden', 'Producto Eliminado', TipoMessage.warning);
  }
  registrarOrden() {
    if (this.cartService.getItems != null) {
      let itemsCarrito = this.cartService.getItems;
      //Armar la estructura de la tabla intermedia
      //[{videojuegoId:valor,cantidad:valor}]
      console.log(itemsCarrito);
      let detalles = itemsCarrito.map(
        (x) => ({
          ['productoId']: x.idItem,
          ['cantidad']: x.cantidad,
          ['estadoPedidoId']: 1,
        })
        //Datos para el API
      );
      console.log(this.pedidosForm.value);
      let infoOrden = {
        fechaOrden: new Date(this.fecha),
        otros: this.pedidosForm.value,
        productos: detalles,
        total: this.total,
      };
      console.log(infoOrden);
      this.gService.create('pedidos', infoOrden).subscribe((respuesta: any) => {
        this.noti.mensaje(
          'Orden',
          'Orden Registrada #' + respuesta.idPedido,
          TipoMessage.success
        );
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
        console.log(respuesta);
      });
    } else {
      this.noti.mensaje(
        'Orden',
        'Agregue Productos a la orden',
        TipoMessage.warning
      );
    }
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.pedidosForm=this.fb.group({
      direccion: [null, Validators.required],
      metodo: [null, Validators.required],
    })
  }

  listaDirecciones(id:number) {
    const clienteId = 1;
    this.direccionList = null;
    this.gService
      .list(`direccion/usuario/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.direccionList = data;
      });
  }
  listaMetodos(id:number) {
    const clienteId = 1;
    this.metodosList = null;
    this.gService
      .list(`pagos/usuario/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.metodosList = data;
      });
  }
  onAddressSelected(event: any) {
    const selectedAddressId = event.value;
    this.selectedAddress = this.direccionList.find((address: any) => address.idDireccion === selectedAddressId);
    console.log(this.selectedAddress)
  }
  onpaymentSelected(event: any) {
    const selectedPaymentId = event.value;
    this.selectedPayment = this.metodosList.find((address: any) => address.idPago === selectedPaymentId);
    console.log(this.selectedPayment)
  }
}
