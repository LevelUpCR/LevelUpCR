import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatStepper } from '@angular/material/stepper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductosDiagComponent } from 'src/app/productos/productos-diag/productos-diag.component';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html',
  styleUrls: ['./pedidos-index.component.css'],
})
export class PedidosIndexComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLinear = false;

  //Lista de direccion
  direccionList: any;
  metodosList: any;
  selectedAddress: any;
  selectedPayment: any;
  selectedProvince: any;
  provinces: any;
  currentUser: any;
  direccionSeleccionada: any;
  tiposPagoList: any;

  //Nombre del formulario
  pedidosForm: FormGroup;
  direccionesForm: FormGroup;
  pagosForm: FormGroup;

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
    private dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {
    this.listaTiposPago();
    this.formularioReactive();
    this.formularioReactive2();
    this.formularioReactive3();
  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Suscriocion a la informacion del usuario actual
    console.log(this.currentUser.user.idUsuario)
    this.listaDirecciones(1);
    this.listaMetodos(1);
    // this.http.get('https://levelupcr.github.io/APIProvinciasCR/CRAPI.json').subscribe((res: Response) => {
    //   console.log(res);
    //   this.provinces = res;
    // });
    // console.log(this.provinces);
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
      this.limpiar();
    } else {
      this.noti.mensaje(
        'Orden',
        'Agregue Productos a la orden',
        TipoMessage.warning
      );
    }
  }

  registrarDireccion() {
    this.direccionesForm.patchValue({ usuarioId: this.currentUser.user.idUsuario });
    console.log(this.direccionesForm.value);

    this.gService.create('direccion', this.direccionesForm.value).subscribe((respuesta: any) => {
        this.noti.mensaje(
            'Dirección',
            'Dirección Registrada',
            TipoMessage.success
        );
        console.log(respuesta.idDireccion);

        // Aquí dentro, el valor de respuesta.idDireccion está disponible y es correcto
        const idDireccionGuardada = respuesta.idDireccion;

        this.listaDirecciones(1);
        console.log(this.direccionList);

        this.pedidosForm.get('direccion')?.reset();
        this.pedidosForm.get('direccion')?.setValue(idDireccionGuardada);

        this.gService
      .list(`direccion/${idDireccionGuardada}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.selectedAddress = data;
      });

      
        console.log(this.selectedAddress);

    });
}

registrarPago() {
  this.pagosForm.patchValue({ usuarioId: this.currentUser.user.idUsuario });
  console.log(this.pagosForm.value);

  this.gService.create('pagos', this.pagosForm.value).subscribe((respuesta: any) => {
    this.noti.mensaje(
      'Pago',
      'Pago Registrado',
      TipoMessage.success
    );
    console.log(respuesta.idPago);

    // Aquí dentro, el valor de respuesta.idPago está disponible y es correcto
    const idPagoGuardada = respuesta.idPago;

    this.listaMetodos(1);

    this.pedidosForm.get('metodo')?.reset();
    this.pedidosForm.get('metodo')?.setValue(idPagoGuardada);

    this.gService
      .list(`pagos/${idPagoGuardada}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.selectedPayment = data;
        // Now the data is assigned to selectedPayment.
        console.log(this.selectedPayment);
      });
  });
}





  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.pedidosForm = this.fb.group({
      direccion: [null, Validators.required],
      metodo: [null, Validators.required],
    });
  }

  //Crear Formulario
  formularioReactive2() {
    //[null, Validators.required]
    this.direccionesForm = this.fb.group({
      provincia: [null, Validators.required],
      canton: [null, Validators.required],
      distrito: [null, Validators.required],
      direccion: [null, Validators.required],
      codigoPostal: [null, Validators.required],
      telefono: [null, Validators.required],
      usuarioId: [null, Validators.required],
    });
  }

  //Crear Formulario
  formularioReactive3() {
    //[null, Validators.required]
    this.pagosForm = this.fb.group({
      numTarjeta: [null, null],
      proveedor: [null, null],
      numCuenta: [null, null],
      fechaExpiracion: [null, null],
      nombre: [null, Validators.required],
      usuarioId: [null, Validators.required],
      tipoPagoId: [null, Validators.required],
    });
  }

  listaDirecciones(id: number) {
    const clienteId = this.currentUser.user.idUsuario;
    
    this.gService
      .list(`direccion/usuario/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.direccionList = data;
      });
      
      console.log(this.direccionList);
  }
  listaMetodos(id: number) {
    const clienteId = this.currentUser.user.idUsuario;
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
    this.selectedAddress = this.direccionList.find(
      (address: any) => address.idDireccion === selectedAddressId
    );
    console.log(this.selectedAddress);
  }
  onpaymentSelected(event: any) {
    const selectedPaymentId = event.value;
    this.selectedPayment = this.metodosList.find(
      (address: any) => address.idPago === selectedPaymentId
    );
    console.log(this.selectedPayment);
  }

  listaTiposPago() {
    this.tiposPagoList = null;
    this.gService
      .list('tipopago')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.tiposPagoList = data;
      });
  }

  onprovinceSelected(event: any) {
    const selectedProvince = event.value;
    
    console.log(this.selectedProvince);
  }

  limpiar() {
    this.stepper.reset();
    this.selectedPayment = null;
    this.selectedAddress = null;
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
}
