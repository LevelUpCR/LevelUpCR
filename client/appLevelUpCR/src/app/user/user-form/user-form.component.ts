import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
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
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      id: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
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

              role: this.usuarioInfo.role,
            });
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



    console.log(this.formCreate.value);
    //Accion API create enviando toda la informacion del formulario
    //Verificar validación
    if (this.formCreate.invalid) {
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
  //Actualizar Videojuego
  actualizarUsuario() {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.formCreate.invalid) {
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

