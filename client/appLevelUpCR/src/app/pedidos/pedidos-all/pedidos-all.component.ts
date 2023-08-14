import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { PedidosDiagComponent } from '../pedidos-diag/pedidos-diag.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos-all',
  templateUrl: './pedidos-all.component.html',
  styleUrls: ['./pedidos-all.component.css']
})
export class PedidosAllComponent  implements AfterViewInit{

  datos: any;
  dataSource = new MatTableDataSource<any>();
  destroy$:Subject<boolean>=new Subject<boolean>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cliente','estadopedido', 'total','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService
    , private dialog: MatDialog) {
      
  }



  ngAfterViewInit(): void {
    
    this.listaPedidos();
   
  }
  listaPedidos() {
    //localhost:3000/productos
    this.gService
      .list('pedidos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  detalle(id:number){
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(PedidosDiagComponent, dialogConfig);
  }



  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
