import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { tap } from 'rxjs/operators';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';


@Component({
  selector: 'app-user-diag',
  templateUrl: './user-diag.component.html',
  styleUrls: ['./user-diag.component.css']
})
export class UserDiagComponent  implements OnInit{
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  direccionesForm: FormGroup;
  pagosForm: FormGroup;
  currentUser: any;
  direccionList: any;
  metodosList:any;
  selectedAddress:any;
  selectedPayment:any;
  selectedPaymentType:any;
  tiposPagoList:any;
  apiResponse: any;
  apiResponse2: any;
  apiResponse3: any;
    //Respuesta del API crear/modificar
    respPregunta: any;
    respRespuesta: any;
    //Sí es submit
    submitted1 = false;
    submitted2 = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<UserDiagComponent>,
    private dialog: MatDialog,private gService:GenericService,private router: Router,
    private activeRouter: ActivatedRoute,private noti: NotificacionService,

    private fb: FormBuilder,
    private authService: AuthenticationService,
  ) { 
    this.datosDialog=data;
    this.listaTiposPago();
    this.cargaAPI();
  }



  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerUsuario(this.datosDialog.id);
    }
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    console.log(this.currentUser)
    this.formularioReactive2();
    this.listaDirecciones(1);
    this.formularioReactive3();
    this.listaMetodos(1);
  }

  


  obtenerUsuario(id:any){
    console.log(id);
    this.gService
    .get('usuarios',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
    });
   
  }
  
  
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }

  onAddressSelected(event: any) {
    const selectedAddressId = event.value;
    this.selectedAddress = this.direccionList.find(
      (address: any) => address.idDireccion === selectedAddressId
    );
    console.log(this.selectedAddress);
  }

  public errorHandling1 = (control: string, error: string) => {
    return this.direccionesForm.controls[control].hasError(error);
  };

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

  public errorHandling2 = (control: string, error: string) => {
    return this.pagosForm.controls[control].hasError(error);
  };

  registrarDireccion() {
    this.direccionesForm.patchValue({ usuarioId: this.currentUser.user.idUsuario });
    console.log(this.direccionesForm.value);
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
        console.log(respuesta.idDireccion);

        // Aquí dentro, el valor de respuesta.idDireccion está disponible y es correcto
        const idDireccionGuardada = respuesta.idDireccion;

        this.listaDirecciones(1);
        console.log(this.direccionList);



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

registrarPago() {
  this.pagosForm.patchValue({ usuarioId: this.currentUser.user.idUsuario });
  console.log(this.pagosForm.value);

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
    console.log(respuesta.idPago);

    // Aquí dentro, el valor de respuesta.idPago está disponible y es correcto
    const idPagoGuardada = respuesta.idPago;

    this.listaMetodos(1);



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
  this.pagosForm.reset();
}

onpaymentSelected(event: any) {
  const selectedPaymentId = event.value;
  this.selectedPayment = this.metodosList.find(
    (payment: any) => payment.idPago === selectedPaymentId
  );
  console.log(this.selectedPayment);
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
  console.log('Validaciones para fechaExpiracion:', proveedorControl.errors);
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



}