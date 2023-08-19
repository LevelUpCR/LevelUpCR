import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDiagComponent } from '../user-diag/user-diag.component';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';


@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements AfterViewInit {
  datos: any;
  respUsuario: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  usuarioInfo: any;

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
    'estado',
    'acciones',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private notificacion:NotificacionService,
    private activeRouter: ActivatedRoute,
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
        this.datos = data;
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

  deshabilitarUsuario(id: any) {
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update(`usuarios/disable`, {id: id})
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respUsuario = data;
        this.router.navigate(['/usuarios/all'], {
          queryParams: { update: 'true' },
        });
        if (data.habilitado) {
          //Notificar al usuario
          this.notificacion.mensaje('Usuarios', 'El usuario '+data.nombre+' fue habilitado.', TipoMessage.success)
          } else {
            this.notificacion.mensaje('Usuarios', 'El usuario '+data.nombre+' fue deshabilitado.', TipoMessage.success)
          }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}