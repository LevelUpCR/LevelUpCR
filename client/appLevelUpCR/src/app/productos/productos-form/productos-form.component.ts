import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Guardar/Actualizar
  titleButton: string = 'Guardar';
  //Lista de usuarios
  usuariosList: any;
  //Lista de categorías
  categoriasList: any;
  //Lista de estados
  estadosList: any;
  //Videojuego a actualizar
  productoInfo: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  productoForm: FormGroup;
  //id del Videojuego
  idproducto: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaUsuarios();
    this.listaCategorias();
    this.listaEstados();
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idproducto=params['id'];
      if(this.idproducto!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
        this.titleButton="Actualizar";
         //Obtener videojuego a actualizar del API
         this.gService.get('productos',this.idproducto).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.productoInfo=data;
          console.log(data)
          //Establecer los valores en cada una de las entradas del formulario
          this.productoForm.setValue({
            id:this.productoInfo.idProducto,
            nombre:this.productoInfo.nombre,
            descripcion:this.productoInfo.descripcion,
            precio:this.productoInfo.precio,
            cantidad:this.productoInfo.cantidad,
            usuario:this.productoInfo.usuarioId,
            categoria:this.productoInfo.categoriaId,
            estado:this.productoInfo.estadoProductoId,
          })
         });
      };
    });
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.productoForm=this.fb.group({
      id:[null,null],
      nombre:[null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      cantidad: [null, Validators.required],
      usuario: [null, Validators.required],
      categoria: [null, Validators.required],
      estado: [null, Validators.required],
    })
  }

  listaUsuarios() {
    this.usuariosList = null;
    this.gService
      .list('usuarios')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.usuariosList = data;
      });
  }

  listaCategorias() {
    this.categoriasList = null;
    this.gService
      .list('categoriaproductos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.categoriasList = data;
      });
  }

  listaEstados() {
    this.estadosList = null;
    this.gService
      .list('estadoproducto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.estadosList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };

  //Crear Producto
  crearProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    //let gFormat:any=this.videojuegoForm.get('generos').value.map(x=>({['id']: x}))
    
    let cFormat:any=this.productoForm.get('categoria').value;
    let uFormat:any=this.productoForm.get('usuario').value;
    let eFormat:any=this.productoForm.get('estado').value;

    //Asignar valor al formulario
    //this.videojuegoForm.patchValue({generos: gFormat});

    this.productoForm.patchValue({usuario: uFormat});
    this.productoForm.patchValue({categoria: cFormat});
    this.productoForm.patchValue({estado: eFormat});

    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    
    this.gService.create('productos',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      //Obtener respuesta
      this.respProducto=data;
      this.router.navigate(['/productos/all'],{
        queryParams: {create:'true'}
      });
    });
  }
  //Actualizar Videojuego
  actualizarProducto() {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    //let gFormat:any=this.videojuegoForm.get('generos').value.map(x=>({['id']: x }));
    
    let cFormat:any=this.productoForm.get('categoria').value;
    let uFormat:any=this.productoForm.get('usuario').value;
    let eFormat:any=this.productoForm.get('estado').value;

    //Asignar valor al formulario
    //this.videojuegoForm.patchValue({generos: gFormat});

    this.productoForm.patchValue({usuario: uFormat});
    this.productoForm.patchValue({categoria: cFormat});
    this.productoForm.patchValue({estado: eFormat});

    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('productos',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respProducto=data;
      this.router.navigate(['/productos/all'],{
        queryParams: {update:'true'}
      });
    });
  }

  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/productos/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}

