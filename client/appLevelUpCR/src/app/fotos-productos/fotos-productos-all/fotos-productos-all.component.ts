import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { GenericService } from 'src/app/share/generic.service';
@Component({
  selector: 'app-fotos-productos-all',
  templateUrl: './fotos-productos-all.component.html',
  styleUrls: ['./fotos-productos-all.component.css']
})
export class FotosProductosAllComponent implements AfterViewInit  {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'imagen'
  ];
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog
  ) {}
  datos: any;
  imageData: SafeUrl;
  currentFolder: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<any>();
  ngAfterViewInit(): void {
    this.listaProductos();
  }
  listaProductos() {
    this.gService
      .list('fotosProductos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        
        this.datos = data;
        console.log(this.datos);
      });
  }
  
}


