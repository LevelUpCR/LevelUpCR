import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject,OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedidos-diag-vendedor',
  templateUrl: './pedidos-diag-vendedor.component.html',
  styleUrls: ['./pedidos-diag-vendedor.component.css']
})
export class PedidosDiagVendedorComponent  implements OnInit{
  datos:any;
  datosDialog:any;
  total: number = 0.0;
  destroy$:Subject<boolean>= new Subject<boolean>();
  dataSource= new MatTableDataSource<any>();
  displayedColumns = ['nombre','marca', 'precio','acciones'];
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<PedidosDiagVendedorComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data;
    
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerPedido(this.datosDialog.id);
    }
  }
  sumarProductos(producto) {
    this.total+=producto;
    console.log('Se suma un producto:', producto);
  }
  obtenerPedido(id: any) {
    console.log(id);
    this.gService
      .get('pedidos', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        const productosFiltrados = this.datos.productos.filter((producto: any) => {
          return producto.productos.usuarioId === this.datosDialog.idUser;
        });
        this.total = 0.0;
        productosFiltrados.forEach((element: any) => {
          console.log(element.productos.precio);
          const precio = parseFloat(element.productos.precio);
          this.total += precio;
        });
        this.dataSource = new MatTableDataSource(productosFiltrados);
        console.log(this.total);
      });
  }
  
  
  
  
  
  
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}
