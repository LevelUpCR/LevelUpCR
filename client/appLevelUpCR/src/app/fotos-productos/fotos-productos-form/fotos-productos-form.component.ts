import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-fotos-productos-form',
  templateUrl: './fotos-productos-form.component.html',
  styleUrls: ['./fotos-productos-form.component.css']
})
export class FotosProductosFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();


  productoInfo: any;
  respProducto: any;
  submitted = false;
  fotoForm: FormGroup;
  currentUser: any;
  idUsuario: number;
  idProducto: number = 0;
  isCreate: boolean = true;
  selectedFiles :any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.idUsuario = this.currentUser.user.id;
  }

  // Crear formulario
  formularioReactive() {
    //[null, Validators.required]
    this.fotoForm = this.fb.group({
      idProducto: [null, Validators.required],
      myFile: [null, Validators.required],
    });
  }



  // Manejo de errores
  public errorHandling = (control: string, error: string) => {
    return this.fotoForm.controls[control].hasError(error);
  };

  //Crear producto
  crearFotos(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    // if (this.fotoForm.invalid) {
    //   return;
    // }
    console.log(this.fotoForm.value)
    console.log(this.selectedFiles )

    const formData = new FormData();
    const formValue = this.fotoForm.value;

    // Agregar los datos al FormData
    Object.keys(formValue).forEach((key) => {
      const value = formValue[key];
      
        // Agregar otros valores al FormData
        formData.append(key, value);

    });

    const files: File[] = this.selectedFiles as File[];
        for (const file of files) {
          formData.append('myFiles', file, file.name);
        }
    console.log(formData.get('myFiles'));
    //Obtener id Categorias del Formulario y Crear arreglo con {id: value}
    // let gFormat: any = this.productoForm.get('categorias').value.map(x => ({ ['id']: x }))

    //Asignar valor al formulario
    // this.productoForm.patchValue({ categoria: gFormat });
    
    console.log(this.fotoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('fotosProductos', formData)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        //Obtener respuesta
        this.respProducto = data;
        // this.router.navigate(['/producto-vendedor'], {
        //   queryParams: { create: 'true' }
        // });
      });
  }






  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

  onFileChange(event: any) {
    const files = event.target.files;
    console.log(files.length)
    
    console.log(files.length)
    if (files.length > 0) {
      const imageArray: File[] = [];
      for (const file of files) {
        imageArray.push(file);
      }
      console.log(imageArray)
      const maxImages = 5;
      this.selectedFiles = imageArray.slice(0, maxImages);
    }
  }
  

  countSelectedImages(): number {
    const myFileControl = this.fotoForm.get('myFile');
    return myFileControl.value ? myFileControl.value.length : 0;
  }
}
