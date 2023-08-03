import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GenericService } from 'src/app/share/generic.service';

interface UploadResponse {
  newfotoproducto: any;
}

@Component({
  selector: 'app-productos-create-image',
  templateUrl: './productos-create-image.component.html',
  styleUrls: ['./productos-create-image.component.css'],
})
export class ProductosCreateImageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  archivos: any[] = [];
  respFoto: any;
  fotoForm: FormGroup;
  submitted = false;
  previsualizacion: SafeUrl | null = null;
  loading = false;
  imagePreview: string;

  constructor(
    private sanitizer: DomSanitizer,
    private gService: GenericService,
    private router: Router,
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute
  ) {
    this.formularioReactive();
  }

  formularioReactive(): void {
    this.fotoForm = this.fb.group({
      foto: [null],
      idProducto: [null],
    });
  }

  ngOnInit() {
    image: new FormControl(null, { validators: [Validators.required]})
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.fotoForm.patchValue({image:file});
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  capturarFile(event: any): void {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(this.previsualizacion);
    });
    this.archivos.push(archivoCapturado);
    console.log(event.target.files);
  }

  extraerBase64 = async (file: File): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        this.loading = true;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result as string;
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(base64String);
          resolve({
            Blob: file,
            image: safeUrl,
            base: safeUrl,
          });
        };
        reader.onerror = (error) => {
          resolve({
            Blob: file,
            image: null,
            base: null,
          });
        };
        this.loading = false;
      } catch (e) {
        this.loading = false;
        return null;
      }
    });

  subirArchivo(): void {
    try {
      this.submitted = true;
      if (this.fotoForm.invalid) {
        return;
      }
      console.log(this.fotoForm.value);
      this.gService
        .create('fotosproductos/crearFoto', this.fotoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respFoto = data;
          this.router.navigate(['/productos'], {
            queryParams: { create: 'true' },
          });
        });
    } catch (e) {
      console.log('ERROR', e);
    }
  }
}
