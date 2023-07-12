import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedidos-diag-vendedor',
  templateUrl: './pedidos-diag-vendedor.component.html',
  styleUrls: ['./pedidos-diag-vendedor.component.css']
})
export class PedidosDiagVendedorComponent  implements OnInit{
  datos:any;
  datosDialog:any;
  total: number = 1;
  destroy$:Subject<boolean>= new Subject<boolean>();
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
      });
  }
  
  
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}
