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
  selector: 'app-user-diag',
  templateUrl: './user-diag.component.html',
  styleUrls: ['./user-diag.component.css']
})
export class UserDiagComponent  implements OnInit{
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
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<UserDiagComponent>,
    private dialog: MatDialog,private gService:GenericService,private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService,
  ) { 
    this.datosDialog=data;
  }



  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerUsuario(this.datosDialog.id);
    }
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    console.log(this.currentUser)
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



}