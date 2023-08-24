import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PedidosDiagVendedorComponent } from '../pedidos-diag-vendedor/pedidos-diag-vendedor.component';
import { EvalucionesFormVendedorComponent } from 'src/app/evaluaciones/evaluciones-form-vendedor/evaluciones-form-vendedor.component';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-pedidos-vendedor',
  templateUrl: './pedidos-vendedor.component.html',
  styleUrls: ['./pedidos-vendedor.component.css']
})
export class PedidosVendedorComponent implements OnInit {
  datos:any;
  idUser:Number;
  destroy$:Subject<boolean>=new Subject<boolean>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cliente','estadopedido','acciones', 'calificacion'];
  evaluaciones: any;
  currentUser: any;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService
    , private dialog: MatDialog,
    private authService: AuthenticationService) {
      this.authService.currentUser.subscribe((x) => (this.currentUser = x));
      
  }



  ngOnInit(): void {
    this.listaPedidos()
    this.obtenerEvaluacionesXCalificador()
  }
  listaPedidos(){
    //localhost:3000/pedidos/cliente/:id
    
    const vendedorId = this.currentUser.user.idUsuario; //Cambiarlo a id, para que ahora si pueda funcionar con todos los vendedores
    this.idUser=vendedorId;
    this.gService.list(`pedidos/vendedor/${vendedorId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{

        this.datos=data;

        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      });   

  }
  detalle(id:number){

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

  crearCalificacion(id: number, idUsuario: number) {
    /* this.router.navigate(['/evaluaciones/cliente/create'], {
      relativeTo: this.route,
    }); */
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
      calificadoId: idUsuario
    };
    const dialogRef = this.dialog.open(EvalucionesFormVendedorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.obtenerEvaluacionesXCalificador();
    });
  }

  hayEvaluacion(idUsuario: number, idPedido: number): boolean {
    const evaluacionesFiltradas = this.evaluaciones.filter(
      (evaluacion) => evaluacion.calificadoId === idUsuario && evaluacion.pedidoId === idPedido
    );

    return evaluacionesFiltradas.length === 0;
  }

  obtenerEvaluacionesXCalificador() {
    this.gService
      .get('evaluacion/calificador', this.currentUser.user.idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.evaluaciones = data;
      });
  }


}


