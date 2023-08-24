import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-evaluciones-diag-cliente',
  templateUrl: './evaluciones-diag-cliente.component.html',
  styleUrls: ['./evaluciones-diag-cliente.component.css']
})
export class EvalucionesDiagClienteComponent {
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductosAllItem>;
  dataSource= new MatTableDataSource<any>();

  displayedColumns = ['nombre','marca','calificacion'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<EvalucionesDiagClienteComponent>,
    private gService:GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,

  ) { 
    this.datosDialog=data;
    
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerProductos(this.datosDialog.id);
    }
  }

  obtenerProductos(id:any){
    console.log(id);
    this.gService
    .get('pedidos',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log("hola");
      console.log(data);
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

  crearCalificacion(id: number) {
    this.router.navigate(['/evaluaciones/cliente/create'], {
      relativeTo: this.route,
    });
    /* console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(EvalucionesDiagClienteComponent, dialogConfig); */
  }
}
