import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PedidosDiagVendedorComponent } from '../pedidos-diag-vendedor/pedidos-diag-vendedor.component';

@Component({
  selector: 'app-pedidos-vendedor',
  templateUrl: './pedidos-vendedor.component.html',
  styleUrls: ['./pedidos-vendedor.component.css']
})
export class PedidosVendedorComponent {
  datos:any;
  idUser:Number;
  destroy$:Subject<boolean>=new Subject<boolean>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cliente','estadopedido','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService
    , private dialog: MatDialog) {
      
  }



  ngAfterViewInit(): void {
    
   let id=this.route.snapshot.paramMap.get('id');
   console.log(id);
      if(!isNaN(Number(id))){
        this.listaPedidos(Number(id));
      }
   
  }
  listaPedidos(id:number){
    //localhost:3000/pedidos/cliente/:id
    
    const vendedorId = 4; //Cambiarlo a id, para que ahora si pueda funcionar con todos los vendedores
    this.idUser=vendedorId;
    this.gService.list(`pedidos/vendedor/${vendedorId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      });   
      console.log(this.datos);
  }
  detalle(id:number){
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
      idUser:this.idUser,
    };
    this.dialog.open(PedidosDiagVendedorComponent, dialogConfig);
  }

  actualizarPedido(id: number) {
    this.router.navigate(['/pedidos/update', id], {
      relativeTo: this.route,
    });
  }

  crearPedido() {
    this.router.navigate(['/pedidos/create'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


