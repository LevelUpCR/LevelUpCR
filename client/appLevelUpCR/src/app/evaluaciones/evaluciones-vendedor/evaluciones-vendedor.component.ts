import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-evaluciones-vendedor',
  templateUrl: './evaluciones-vendedor.component.html',
  styleUrls: ['./evaluciones-vendedor.component.css']
})
export class EvalucionesVendedorComponent {
  datos: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = [
    'calificacion',
    'comentario',
    'usuario',
    'pedido'
  ];
  promedioFinal: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {}

  ngAfterViewInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.listaEvaluaciones();
    this.promedio();
  }

  listaEvaluaciones(){
    const vendedorId = this.currentUser.user.idUsuario;
    this.gService
      .list(`evaluacion/calificado/${vendedorId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      });
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  promedio(){
    const clienteId = this.currentUser.user.idUsuario;
    console.log(clienteId)
    var promedio = 0.00
    this.gService
      .list(`evaluacion/calificado/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        for (let index = 0; index < data.length; index++) {
          promedio = promedio + parseFloat(data[index]['calificacion']);
        }
        console.log(data.length)
        this.promedioFinal = (promedio/data.length).toFixed(2);
        console.log(this.promedioFinal);
      })
  }
}
