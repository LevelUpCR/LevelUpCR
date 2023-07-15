import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, Inject,OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedidos-diag',
  templateUrl: './pedidos-diag.component.html',
  styleUrls: ['./pedidos-diag.component.css']
})
export class PedidosDiagComponent implements OnInit{
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre','marca', 'precio','impuesto','precioImpuesto'];
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<PedidosDiagComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data;
    
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerPedido(this.datosDialog.id);
    }
  }
  obtenerPedido(id:any){
    console.log(id);
    this.gService
    .get('pedidos',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
        this.dataSource = new MatTableDataSource(this.datos.productos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
    });
   
  }
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}