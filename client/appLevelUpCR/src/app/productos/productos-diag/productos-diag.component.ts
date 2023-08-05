import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-productos-diag',
  templateUrl: './productos-diag.component.html',
  styleUrls: ['./productos-diag.component.css']
})
export class ProductosDiagComponent  implements OnInit{
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  preguntaForm: FormGroup;
  respuestaForm: FormGroup;
  currentUser: any;
    //Respuesta del API crear/modificar
    respPregunta: any;
    respRespuesta: any;
    //Sí es submit
    submitted1 = false;
    submitted2 = false;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<ProductosDiagComponent>,
    private dialog: MatDialog,private gService:GenericService,private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService,
  ) { 
    this.datosDialog=data;
    this.formularioReactive1();
    this.formularioReactive2();
  }

  //Crear Formulario
  formularioReactive1() {
    //[null, Validators.required]
    this.preguntaForm=this.fb.group({
      pregunta: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      productoId: [null, Validators.required],
      usuarioId: [null, Validators.required],
    })
  }

  //Crear Formulario
  formularioReactive2() {
    //[null, Validators.required]
    this.respuestaForm=this.fb.group({
      respuesta: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      preguntaId: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerProducto(this.datosDialog.id);
    }
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    console.log(this.currentUser)
  }

  isCliente(): boolean {
    return this.currentUser.user.role == "Cliente";
  }

  isVendedor(): boolean {
    return this.currentUser.user.role == "Vendedor";
  }

  obtenerProducto(id:any){
    console.log(id);
    this.gService
    .get('productos',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
    });
   
  }



  //Enviar Pregunta
  enviarPregunta(id: number): void {
    //Establecer submit verdadero
    this.submitted1 = true;
    this.preguntaForm.patchValue({productoId: id});
    this.preguntaForm.patchValue({usuarioId: this.currentUser.user.idUsuario});
    if (this.preguntaForm.invalid) {
      return;
    }
    console.log(this.preguntaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('preguntas',this.preguntaForm.value)
    .pipe(takeUntil(this.destroy$),
    tap((data: any) => {
      // Obtener respuesta
      this.respPregunta = data;
      // Volver a obtener las preguntas para actualizar la lista
      this.obtenerProducto(this.datosDialog.id);
    })
    )
     .subscribe((data: any) => {
      //Obtener respuesta
      this.respPregunta=data;
      
    });
  }
  public errorHandling1 = (control: string, error: string) => {
    return this.preguntaForm.controls[control].hasError(error);
  };
  
  public errorHandling2 = (control: string, error: string) => {
    return this.respuestaForm.controls[control].hasError(error);
  };
  //Enviar Respuesta
  enviarRespuesta(id: number): void {
    //Establecer submit verdadero
    this.submitted2 = true;
    console.log(id);
    this.respuestaForm.patchValue({ preguntaId: id });
    console.log(this.respuestaForm.value);
    if (this.respuestaForm.invalid) {
      return;
    }
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .create('respuestas', this.respuestaForm.value)
      .pipe(
        takeUntil(this.destroy$),
        tap((data: any) => {
          // Obtener respuesta
          this.respRespuesta = data;
          // Volver a obtener las preguntas para actualizar la lista
          this.obtenerProducto(this.datosDialog.id);
        })
      )
      .subscribe((data: any) => {
        
      });
  }
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }



}
