import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedPaymentType: any;
  selectedProvince: any;
  provinces: any;
  currentUser: any;
  direccionSeleccionada: any;
  tiposPagoList: any;
  apiResponse: any;
  apiResponse2: any;
  apiResponse3: any;
  productoInfo: any;

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
    this.cargaAPI();

  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Suscriocion a la informacion del usuario actual

    this.listaDirecciones(1);
    this.listaMetodos(1);
    // this.http.get('https://levelupcr.github.io/APIProvinciasCR/CRAPI.json').subscribe((res: Response) => {
    //   console.log(res);
    //   this.provinces = res;
    // });
    // console.log(this.provinces);
  }
  actualizarCantidad(item: any) {
    
    if (item.product.cantidad>0&&item.cantidad+1<=item.product.cantidad) {
      this.cartService.addToCart(item);
      this.total = this.cartService.getTotal();
      this.noti.mensaje(
      'Orden',
      'Cantidad Actualizada ' + item.cantidad,
      TipoMessage.info
    );
    }else{
      this.noti.mensaje(
        'Orden',
        'No existe esta cantidad en stock, el maximo disponible son: '+item.product.cantidad,
        TipoMessage.warning
      );
    }
    
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Orden', 'Producto Eliminado', TipoMessage.warning);
  }
  
  registrarOrden() {
    if (this.cartService.getItems != null) {
      let itemsCarrito = this.cartService.getItems;
      this.pedidosForm.patchValue({ usuarioId: this.currentUser.user.idUsuario });
      //Armar la estructura de la tabla intermedia
      //[{videojuegoId:valor,cantidad:valor}]
      if (this.pedidosForm.invalid) {

        this.noti.mensaje(
          'Orden',
          'Complete la direccion y el metodo de pago antes de registrar una orden',
          TipoMessage.warning
        );
        return;
      }



      console.log(itemsCarrito)


      let detalles = itemsCarrito.map(
        (x) => ({
          ['productoId']: x.idItem,
          ['cantidad']: x.cantidad,
          ['estadoPedidoId']: 1,
        })
        //Datos para el API
      );

      
      
      let infoOrden = {
        fechaOrden: new Date(this.fecha),
        otros: this.pedidosForm.value,
        productos: detalles,
        total: this.total,
      };

      this.gService.create('pedidos', infoOrden).subscribe((respuesta: any) => {
        this.noti.mensaje(
          'Orden',
          'Orden Registrada #' + respuesta.idPedido,
          TipoMessage.success
        );
          
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();

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

    if (this.direccionesForm.invalid) {
      this.noti.mensaje(
        'Direcciones',
        'Complete los campos faltantes',
        TipoMessage.warning
      );
      return;
    }

    this.gService.create('direccion', this.direccionesForm.value).subscribe((respuesta: any) => {
        this.noti.mensaje(
            'Dirección',
            'Dirección Registrada',
            TipoMessage.success
        );


        // Aquí dentro, el valor de respuesta.idDireccion está disponible y es correcto
        const idDireccionGuardada = respuesta.idDireccion;

        this.listaDirecciones(1);


        this.pedidosForm.get('direccion')?.reset();
        this.pedidosForm.get('direccion')?.setValue(idDireccionGuardada);

        this.gService
      .list(`direccion/${idDireccionGuardada}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {

        this.selectedAddress = data;
      });

      


    });
}

registrarPago() {
  this.pagosForm.patchValue({ usuarioId: this.currentUser.user.idUsuario });


  if (this.pagosForm.invalid) {
    this.noti.mensaje(
      'Pagos',
      'Complete los campos faltantes',
      TipoMessage.warning
    );
    return;
  }
  this.gService.create('pagos', this.pagosForm.value).subscribe((respuesta: any) => {
    this.noti.mensaje(
      'Pago',
      'Pago Registrado',
      TipoMessage.success
    );


    // Aquí dentro, el valor de respuesta.idPago está disponible y es correcto
    const idPagoGuardada = respuesta.idPago;

    this.listaMetodos(1);

    this.pedidosForm.get('metodo')?.reset();
    this.pedidosForm.get('metodo')?.setValue(idPagoGuardada);

    this.gService
      .list(`pagos/${idPagoGuardada}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {

        this.selectedPayment = data;
        // Now the data is assigned to selectedPayment.

      });
  });
  this.pagosForm.reset();
}





  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.pedidosForm = this.fb.group({
      direccion: [null, Validators.required],
      metodo: [null, Validators.required],
      usuarioId: [null, Validators.required],
    });
  }

  //Crear Formulario
  formularioReactive2() {
    //[null, Validators.required]
    this.direccionesForm = this.fb.group({
      provincia: [null, Validators.required],
      canton: [null, Validators.required],
      distrito: [null, Validators.required],
      direccion: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      codigoPostal: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'), // Validar números enteros
          Validators.minLength(5),
          Validators.maxLength(5)
        ]),
      ],
      telefono: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'), // Validar números enteros
          Validators.minLength(8),
          Validators.maxLength(8)
        ]),
      ],
      usuarioId: [null, Validators.required],
    });
  }

  getcuentaValidators(): any {
    return (control: AbstractControl) => {
      if (this.selectedPaymentType?.idTipoPago === 1) {
        return Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(8),
          Validators.maxLength(8),
        ])(control);
      } else {
        if (this.selectedPaymentType?.idTipoPago === 4) {
          return Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]+$'),
            Validators.minLength(8),
            Validators.maxLength(20),
          ])(control);
        } else{
        return null; // No aplicar validaciones si no se cumple la condición
        }
      }
    };
  }
  getproveedorValidators(): any {
    return (control: AbstractControl) => {
      if (this.selectedPaymentType?.idTipoPago === 2) {
        return Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])(control);
      } else {
        return null; // No aplicar validaciones si no se cumple la condición
      }
    };
  }
  getcardValidators(): any {
    return (control: AbstractControl) => {
      if (this.selectedPaymentType?.idTipoPago === 2) {
        return Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(16),
          Validators.maxLength(16),
        ])(control);
      } else {
        return null; // No aplicar validaciones si no se cumple la condición
      }
    };
  }
  

  getfechaValidators(): any {
    return (control: AbstractControl) => {
      if (this.selectedPaymentType?.idTipoPago === 2) {
        return Validators.compose([
          Validators.required,
        ])(control);
      } else {
        return null; // No aplicar validaciones si no se cumple la condición
      }
    };
  }

  //Crear Formulario
  formularioReactive3() {
    //[null, Validators.required]
    this.pagosForm = this.fb.group({
      tipoPagoId: [null, Validators.required],
      numTarjeta: [null,this.getcardValidators()],
      proveedor: [null,this.getproveedorValidators()],
      numCuenta: [null,this.getcuentaValidators()],
      fechaExpiracion: [null,this.getfechaValidators()],
      nombre: [null,Validators.compose([Validators.required, Validators.minLength(3)])],
      usuarioId: [null, Validators.required],
    });
  }

  public errorHandling1 = (control: string, error: string) => {
    return this.direccionesForm.controls[control].hasError(error);
  };
  
  public errorHandling2 = (control: string, error: string) => {
    return this.pagosForm.controls[control].hasError(error);
  };
  public errorHandling = (control: string, error: string) => {
    return this.pedidosForm.controls[control].hasError(error);
  };

  listaDirecciones(id: number) {
    const clienteId = this.currentUser.user.idUsuario;
    
    this.gService
      .list(`direccion/usuario/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {

        this.direccionList = data;
      });
      

  }
  listaMetodos(id: number) {
    const clienteId = this.currentUser.user.idUsuario;
    this.metodosList = null;
    this.gService
      .list(`pagos/usuario/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.metodosList = data;
      });
  }
  onAddressSelected(event: any) {
    const selectedAddressId = event.value;
    this.selectedAddress = this.direccionList.find(
      (address: any) => address.idDireccion === selectedAddressId
    );

  }
  onpaymentSelected(event: any) {
    const selectedPaymentId = event.value;
    this.selectedPayment = this.metodosList.find(
      (payment: any) => payment.idPago === selectedPaymentId
    );

  }
  onpaymentTypeSelected(event: any) {
    const selectedTypePaymentId = event.value;
    this.selectedPaymentType = this.tiposPagoList.find(
      (payment: any) => payment.idTipoPago === selectedTypePaymentId
    );
    this.pagosForm.controls['numCuenta'].setValidators(this.getcuentaValidators());
    this.pagosForm.controls['numCuenta'].updateValueAndValidity();
    this.pagosForm.controls['numTarjeta'].setValidators(this.getcardValidators());
    this.pagosForm.controls['numTarjeta'].updateValueAndValidity();
    this.pagosForm.controls['proveedor'].setValidators(this.getproveedorValidators());
    this.pagosForm.controls['proveedor'].updateValueAndValidity();
    this.pagosForm.controls['fechaExpiracion'].setValidators(this.getfechaValidators());
    this.pagosForm.controls['fechaExpiracion'].updateValueAndValidity();
    const proveedorControl = this.pagosForm.get('numTarjeta');

  }

  listaTiposPago() {
    this.tiposPagoList = null;
    this.gService
      .list('tipopago')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.tiposPagoList = data;
      });
      
  }
  cargaAPI() {
    this.apiResponse = null;
    this.gService
      .list('direccion/provincia')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
         
        this.apiResponse = data;
      });

  }

  cargaAPICantones(provincia:string) {
    this.apiResponse2 = null;
    this.gService
      .list(`direccion/canton/${provincia}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
         
        this.apiResponse2 = data;
      });

  }

  cargaAPIDistritos(provincia:string,canton:string) {
    this.apiResponse3 = null;
    this.gService
      .list(`direccion/distrito/${provincia}/${canton}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
         
        this.apiResponse3 = data;

      });

  }

  onProvinciaSelected(provincia:string) {

    this.cargaAPICantones(provincia);

  }
  onCantonSelected(idPro:string,idCan:string) {

    this.cargaAPIDistritos(idPro,idCan);
  }


  

  limpiar() {
    this.stepper.reset();
    this.selectedPayment = null;
    this.selectedAddress = null;
  }

  detalleProducto(id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductosDiagComponent, dialogConfig);
  }
}
