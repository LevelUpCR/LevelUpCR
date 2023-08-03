import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';


@Component({
  selector: 'app-productos-diag',
  templateUrl: './productos-diag.component.html',
  styleUrls: ['./productos-diag.component.css']
})
export class ProductosDiagComponent implements OnInit{
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
      pregunta: [null, null],
      productoId: [null, null],
      usuarioId: [null, null],
    })
  }

  //Crear Formulario
  formularioReactive2() {
    //[null, Validators.required]
    this.respuestaForm=this.fb.group({
      respuesta: [null, null],
      preguntaId: [null, null],
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
    console.log(this.preguntaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('preguntas',this.preguntaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respPregunta=data;
      this.router.navigate(['/productos'],{
        queryParams: {create:'true'}
      });
    });
    this.close();
  }
  

  //Enviar Pregunta
  enviarRespuesta(id: number): void {
    //Establecer submit verdadero
    this.submitted2 = true;
    console.log(id);
    this.respuestaForm.patchValue({preguntaId: id});
    console.log(this.respuestaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('respuestas',this.respuestaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respRespuesta=data;
      this.router.navigate(['/productos'],{
        queryParams: {create:'true'}
      });
    });
    this.close();
  }
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }



}
