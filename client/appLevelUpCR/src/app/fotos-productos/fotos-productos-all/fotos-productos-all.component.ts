import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
        console.log(data);
        this.datos = data.map((foto: any) => {
          console.log(foto.Foto)
          const blob = new Blob([foto.Foto], { type: 'image/jpg' });
          const url = window.URL.createObjectURL(blob);
          foto.blobUrl = this.sanitizer.bypassSecurityTrustUrl(url);
          console.log(foto)
          return foto;
        });
      });
  }
  

  convertirBytesEnBlob(byteString: string): Blob {
    const byteCharacters = atob(byteString);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpg' }); // Ajusta el tipo MIME según el formato de la imagen
    console.log(blob)
    return blob;
  }
}
