import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ProductosDiagComponent } from '../productos-diag/productos-diag.component';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-productos-index',
  templateUrl: './productos-index.component.html',
  styleUrls: ['./productos-index.component.css'],
})
export class ProductosIndexComponent {
  isAutenticated: boolean;
  datos: any; //Respuesta del API
  filterDatos: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  tarjetasPorPagina = 4;
  paginaActual = 1;
  categoriasList: any;
  selectedCategoryId: any;
  constructor(private gService: GenericService,private authService: AuthenticationService, private dialog: MatDialog,private cartService:CartService,
    private notificacion:NotificacionService) {
    // Subscripcion a la informacion del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Suscriocion a la informacion del usuario actual
    console.log(this.currentUser)
    this.authService.isAuthenticated.subscribe(
      (x) => (this.isAutenticated = x)
    );
    this.listaProductos();
    this.listaCategorias();
  }
  //Listar los videojuegos llamando al API
  listaProductos() {
    //localhost:3000/productos
    this.gService
      .list('productos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.filterDatos=data;
      });
  }
  detalleProducto(id: number) {
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductosDiagComponent, dialogConfig);
  }
  comprar(id:number){
    this.gService
    .get('productos',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar videojuego obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.notificacion.mensaje('Orden', 'Producto: '+data.nombre+' agregado a la orden', TipoMessage.success)
    });
  }
  isCliente(): boolean {
    const roles = this.currentUser?.user.role || [];
    return roles.some(role => role.idRol === 2);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  filterProductos(text:String){
    if(!text){
      this.filterDatos=this.datos
    }else{
      this.filterDatos=this.datos.filter(
        x=> x?.nombre.toLowerCase().includes(text.toLowerCase())
      )
    }
  }

  listaCategorias() {
    this.categoriasList = [];
    
    // Agregar el registro "Mostrar Todos" al principio de la lista
    this.categoriasList.push({ idCategoria: null, categoria: "Mostrar todos" });
    
    this.gService
      .list('categoriaproductos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // Agregar las categorías obtenidas del servicio
        this.categoriasList.push(...data);
      });
  }
  

  filterCategoria(selectedCategoryId: number | null) {

    console.log(this.datos);
    if(!selectedCategoryId){
      this.filterDatos=this.datos
      console.log('Categoría seleccionada:', this.filterDatos);
    }else{
      this.filterDatos = this.datos.filter(x => x?.categoriaId === selectedCategoryId);

    }
    // Aquí puedes implementar la lógica para filtrar en función de la categoría seleccionada.
    console.log('Categoría seleccionada:', this.filterDatos);
    // ...
  }

  filterOrdenes(selectedOrdenId: number | null) {
    console.log(this.datos);

    if (!selectedOrdenId) {
        this.filterDatos = this.datos; // Copiar los datos originales
    } else {
        if (selectedOrdenId === 2) {
            this.filterDatos = this.datos.slice().sort((a, b) => a.precio - b.precio); // Ordenar de menor a mayor por precio
        } else if (selectedOrdenId === 1) {
            this.filterDatos = this.datos.slice().sort((a, b) => b.precio - a.precio); // Ordenar de mayor a menor por precio
        }else{
          this.filterDatos = this.datos;
        }
    }
}



  clearSelection() {
    this.selectedCategoryId = null;
    this.filterCategoria(this.selectedCategoryId);
  }

  ordenesList = [
    { idOrden: null, Orden:  'Mostrar orden Original' },
    { idOrden: 1, Orden: 'Precio: De mayor a menor' },
    { idOrden: 2, Orden: 'Precio: De menor a mayor' },
    // ...
  ];
}
