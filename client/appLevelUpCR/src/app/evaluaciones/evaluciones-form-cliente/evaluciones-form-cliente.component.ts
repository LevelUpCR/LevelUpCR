import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-evaluciones-form-cliente',
  templateUrl: './evaluciones-form-cliente.component.html',
  styleUrls: ['./evaluciones-form-cliente.component.css']
})
export class EvalucionesFormClienteComponent {
  calificacion= [
    { idCalificacion: 1, calificacion:  '1' },
    { idCalificacion: 2, calificacion:  '2' },
    { idCalificacion: 3, calificacion:  '3' },
    { idCalificacion: 4, calificacion:  '4' },
    { idCalificacion: 5, calificacion:  '5' },
    // ...
  ];
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Guardar/Actualizar
  titleButton: string = 'Guardar';
  //Lista de usuarios
/*   usuariosList: any;
 */  //Lista de categorías
/*   categoriasList: any;
 */  //Lista de estados
/*   estadosList: any;
 */  //Videojuego a actualizar
  evaluacionInfo: any;
  //Respuesta del API crear/modificar
  respevaluacion: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  evaluacionForm: FormGroup;
  //id del Videojuego
  idevaluacion: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  currentUser: any;
  datosDialog:any;
  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,private noti: NotificacionService,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<EvalucionesFormClienteComponent>,
  ) {
    this.datosDialog=data;
    this.formularioReactive();
    /* this.listaCategorias();
    this.listaEstados(); */
  }

  public errorHandling = (control: string, error: string) => {
    return this.evaluacionForm.controls[control].hasError(error);
  };

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idevaluacion = params['id'];
      if (this.idevaluacion != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.titleButton = 'Actualizar';
        //Obtener videojuego a actualizar del API
        this.gService
          .get('evaluacion', this.idevaluacion)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.evaluacionForm = data;
            //Establecer los valores en cada una de las entradas del formulario
            this.evaluacionForm.setValue({
              id: this.evaluacionInfo.idEvaluacion,
              calificacion: this.evaluacionInfo.calificacion,
              comentario: this.evaluacionInfo.comentario,
            });
          });
      }
    });
  }

  formularioReactive() {
    //[null, Validators.required]
    this.evaluacionForm = this.fb.group({
      calificadorId: [null, null],
      calificadoId: [null, null],
      pedidoId: [null, null],
      calificacion: [
        null,
        Validators.compose([Validators.required]),
      ],
      comentario: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      /* precio: [null, Validators.required],
      cantidad: [null, Validators.required],
      usuario: [null, Validators.required],
      categoria: [null, Validators.required],
      estado: [null, Validators.required], */
    });
  }

  crearEvaluacion(): void {
    //Establecer submit verdadero
    this.submitted = true;

    this.evaluacionForm.patchValue({ pedidoId: this.datosDialog.id });
    this.evaluacionForm.patchValue({ calificadorId: this.currentUser?.user.idUsuario });
    this.evaluacionForm.patchValue({ calificadoId: this.datosDialog.calificadoId });

    //Accion API create enviando toda la informacion del formulario
    //Verificar validación
    if (this.evaluacionForm.invalid) {
      this.noti.mensaje(
        'Evaluacion',
        'Complete todos los campos para crear la evaluacion',
        TipoMessage.warning
      );
      return;
    }
    this.gService
      .create('evaluacion', this.evaluacionForm.value)
      .pipe(takeUntil(this.destroy$))//,
      // tap((data: any) => {
      //   // Obtener respuesta
      //   this.respPregunta = data;
      //   // Volver a obtener las preguntas para actualizar la lista
      //   this.obtenerProducto(this.datosDialog.id);
      // })
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respevaluacion = data;
        this.noti.mensaje(
          'Evaluacion',
          'La Evaluacion sobre este proveedor ha sido completada',
          TipoMessage.success
        );

        this.close()
      });
  }

  onReset() {
    this.submitted = false;
    this.evaluacionForm.reset();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}
