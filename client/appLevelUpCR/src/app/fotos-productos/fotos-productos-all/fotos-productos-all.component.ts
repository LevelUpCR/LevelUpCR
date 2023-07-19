import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-fotos-productos-all',
  templateUrl: './fotos-productos-all.component.html',
  styleUrls: ['./fotos-productos-all.component.css']
})
export class FotosProductosAllComponent implements AfterViewInit, OnDestroy {
  displayedColumns = ['imagen'];

  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private http: HttpClient // Agregamos HttpClient para hacer las peticiones al backend
  ) {}

  datos: any;
  imageData: SafeUrl;
  currentFolder: string;
  destroy$: Subject<void> = new Subject<void>();
  dataSource = new MatTableDataSource<any>();

  ngAfterViewInit(): void {
    this.listaProductos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listaProductos() {
    this.gService
      .list('fotosProductos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.dataSource.data = this.datos;
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageData = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  uploadImage() {
    if (!this.imageData) {
      console.log('No se ha seleccionado una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.dataURItoBlob(this.imageData), 'imagen'); // Convertimos SafeUrl a Blob

    this.http.post<any>('http://localhost:3000/fotosproductos/upload', formData).subscribe(
      (response) => {
        console.log('Imagen subida correctamente', response);
        this.listaProductos(); // Actualizar la tabla después de subir la imagen
      },
      (error) => {
        console.error('Error al subir la imagen', error);
      }
    );
  }

  dataURItoBlob(dataURI: SafeUrl): Blob {
    const byteString = atob(dataURI.toString().split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' }); // Cambiar el tipo MIME según el tipo de imagen
  }
}
