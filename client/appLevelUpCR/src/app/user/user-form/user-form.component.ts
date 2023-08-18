import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedRoles=null;
  //Titulo
  titleForm: string = 'Crear';
  titlePass: string = 'Password';
  //Guardar/Actualizar
  titleButton: string = 'Guardar';
  //Videojuego a actualizar
  usuarioInfo: any;
  //Respuesta del API crear/modificar
  respUsuario: any;
  //Sí es submit
  submitted = false;
  //id del Videojuego
  idUsuario: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  currentUser: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      id: [null,null],
      cedula: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'), // Validar números enteros
          Validators.minLength(9),
          Validators.maxLength(9)
        ]),
      ],
      nombre: [null, Validators.compose([Validators.required, Validators.minLength(3)]),],
      telefono: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'), // Validar números enteros
          Validators.minLength(8),
          Validators.maxLength(8)
        ]),
      ],
      correo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email, // Utiliza Validators.email para validar el formato de correo electrónico
        ]),
      ],
      password: [null, Validators.required],
      role: [null, Validators.required],
      compania: [null, this.getCompaniaValidators()],
    });
    this.getRoles();
  }
  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idUsuario = params['id'];
      if (this.idUsuario != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.titleButton = 'Actualizar';
        this.titlePass= "Password"
        //Obtener videojuego a actualizar del API
        this.gService
          .get('usuarios', this.idUsuario)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.usuarioInfo = data;
            console.log(data);
            //Establecer los valores en cada una de las entradas del formulario
            this.formCreate.setValue({
              id: this.usuarioInfo.idUsuario,
              cedula: this.usuarioInfo.cedula,
              nombre: this.usuarioInfo.nombre,
              telefono: this.usuarioInfo.telefono,
              correo: this.usuarioInfo.correo,
              password: "",
              role: this.usuarioInfo.role.map(({idRol}) => idRol),
              compania: this.usuarioInfo.compania,
            });
            console.log(this.formCreate.value)
          });
      }
    });
  }
  submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formCreate.invalid){
     return;
    }
    this.authService.createUser(this.formCreate.value)
    .subscribe((respuesta:any)=>{
      this.usuario=respuesta;
      this.router.navigate(['/usuario/all'],{
        //Mostrar un mensaje
        queryParams:{register:'true'},
      })
    })
  }
  onReset() {
    this.formCreate.reset();
  }
  getRoles() {
    this.gService
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.roles = data;
        console.log( this.roles);
      });
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };

  //Crear Producto
  crearUsuario(): void {
    //Establecer submit verdadero
    this.submitted = true;

    let rFormat:any=this.formCreate.get('role').value.map(x=>({['idRol']: x }));
    //Asignar valor al formulario 
    this.formCreate.patchValue({ role:rFormat});

    if (rFormat.length > 1 && rFormat[0].idRol === 1) {
      this.noti.mensaje(
        'Usuarios',
        'Admin no puede tener otros roles',
        TipoMessage.warning
      );
      return;
    }


    console.log(this.formCreate.value);
    //Accion API create enviando toda la informacion del formulario
    //Verificar validación
    if (this.formCreate.invalid) {
      this.noti.mensaje(
        'Usuarios',
        'Complete todos los campos para crear un usuario',
        TipoMessage.warning
      );
      return;
    }
    this.gService
      .create('usuarios', this.formCreate.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respUsuario = data;
        this.router.navigate(['/usuarios/all'], {
          queryParams: { create: 'true' },
        });
      });
  }

  shouldShowCompaniaField() {
    if (this.selectedRoles===null) {
      return false
    } else {
      return this.selectedRoles.includes(3);
    }
    
  }

  onCompanySelected(rolesSelected: any) {

   this.selectedRoles=rolesSelected
   this.formCreate.controls['compania'].setValidators(this.getCompaniaValidators());
   this.formCreate.controls['compania'].updateValueAndValidity();
   this.formCreate.get('compania').reset();
   //const proveedorControl = this.formCreate.get('compania');
   //console.log('Validaciones para fechaExpiracion:', proveedorControl.errors);
  }

  getCompaniaValidators(): any {
    return (control: AbstractControl) => {
      if (this.selectedRoles?.includes(3)) {
        return Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])(control);
      } else {
        return null; // No aplicar validaciones si no se cumple la condición
      }
    };
  }
  //Actualizar Videojuego
  actualizarUsuario() {
    //Establecer submit verdadero
    this.submitted = true;
    let rFormat:any=this.formCreate.get('role').value.map(x=>({['idRol']: x }));
    //Asignar valor al formulario 
    this.formCreate.patchValue({ role:rFormat});


    //Verificar validación
    if (this.formCreate.invalid) {
      this.noti.mensaje(
        'Usuarios',
        'Complete todos los campos para crear un usuario',
        TipoMessage.warning
      );
      return;
    }



    console.log(this.formCreate.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('usuarios', this.formCreate.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respUsuario = data;
        this.router.navigate(['/usuarios/all'], {
          queryParams: { update: 'true' },
        });
      });
  }
}

