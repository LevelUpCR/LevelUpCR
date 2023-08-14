import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
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
    });
    this.getRoles();
  }
  ngOnInit(): void {}
  submitForm() {
    this.makeSubmit=true;
    //Validación
    if (this.formCreate.invalid) {
      this.noti.mensaje(
        'Usuarios',
        'Complete todos los campos para crear un usuario',
        TipoMessage.warning
      );
      return;
    }
    this.authService.createUser(this.formCreate.value)
    .subscribe((respuesta:any)=>{
      this.usuario=respuesta;
      this.router.navigate(['/usuario/login'],{
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

  
        // Filtrar y eliminar el rol 'ADMIN' si existe en la lista
        this.roles = this.roles.filter(role => role.id !== 'ADMIN');
        console.log(this.roles);
      });
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
