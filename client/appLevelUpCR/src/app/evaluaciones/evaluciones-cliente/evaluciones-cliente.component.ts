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
  selector: 'app-evaluciones-cliente',
  templateUrl: './evaluciones-cliente.component.html',
  styleUrls: ['./evaluciones-cliente.component.css']
})
export class EvalucionesClienteComponent {
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
  }

  listaEvaluaciones(){
    const clienteId = this.currentUser.user.idUsuario;
    this.gService
      .list(`evaluacion/calificador/${clienteId}`)
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
    var promedio = 0
    this.gService
      .list(`evaluacion/calificado/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        for (let index = 0; index < data.length; index++) {
          promedio = promedio + parseFloat(data[index]['calificacion']);
        }
        promedio = promedio/data.length
        console.log(promedio);
      })
  }
}
