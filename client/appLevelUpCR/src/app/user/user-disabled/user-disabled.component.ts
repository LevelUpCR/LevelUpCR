import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDiagComponent } from '../user-diag/user-diag.component';

@Component({
  selector: 'app-user-disabled',
  templateUrl: './user-disabled.component.html',
  styleUrls: ['./user-disabled.component.css']
})
export class UserDisabledComponent implements AfterViewInit {
  datos: any;
  usuarioInfo: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'cedula',
    'nombre',
    'telefono',
    'correo',
    'role',
    'acciones',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private activeRouter: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.listaProductos();
  }
  listaProductos() {
    //localhost:3000/productos
    this.gService
      .list('usuarios/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
  
        // Filtrar los elementos donde la propiedad 'habilitado' sea igual a false
        this.datos = data.filter((item: any) => item.habilitado === false);
  
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  
  detalle(id: number) {
    
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(UserDiagComponent, dialogConfig);
  }
  actualizarUsuario(id: number) {
    this.router.navigate(['/usuarios/update', id], {
      relativeTo: this.route,
    });
  }

  crearUsuario() {
    this.router.navigate(['/usuarios/create'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


