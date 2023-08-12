import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-fotos-productos-all',
  templateUrl: './fotos-productos-all.component.html',
  styleUrls: ['./fotos-productos-all.component.css']
})
export class FotosProductosAllComponent implements OnInit{
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  datos:any;
  submitted = false;
  currentUser: any;
  fotografias: any;
  selectedFiles: File[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<FotosProductosAllComponent>,
    private gService:GenericService,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder, 
    //private snackBar: MatSnackBar
  ) { 
    this.datosDialog=data;
  }
  // ngAfterViewInit(): void {
  //   // Access the fileInput element and add the change event listener
  //   const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  //   if (fileInput) {
  //     fileInput.addEventListener('change', (event) => this.onFilesSelected(event));
  //   }
  // }

  obtenerProducto(id:any){
    console.log(id);
   this.gService
  .get('productos', id)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    this.datos = data; 
    console.log(this.datos);
    this.fotografias = this.datos.fotografias;
  });

  }

  createFotografia(): void {
    this.submitted = true;
  
    const productId = this.datosDialog.id;
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      
      // Append each selected file to the FormData object
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('imagen', this.selectedFiles[i]);
      }

      formData.append('id', productId);
      formData.forEach((valor, clave) => {
        console.log(clave, valor);
      });

      this.gService.create('fotosproductos', formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.router.navigate(['/productos'], {
              queryParams: { create: 'true' }
            });
            //this.showSuccessMessage('Se asignaron las imágenes exitosamente!');
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    } else {
      console.error('No images selected.');
    }
    this.close();
  }
  

  onImageSelected(event: any): void {
    const selectedImage = event.target.files[0]; // Get the selected file
    this.uploadImage(selectedImage); // Call the uploadImage function with the selected image
  }
  async uploadImage(selectedImage: File): Promise<void> {
    const imageInput = document.getElementById('imageInput') as HTMLInputElement;
  
    if (!selectedImage) {
      alert('Please select an image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('imagen', selectedImage);
  
    try {
      const idproducto = 1; // Replace with the actual product ID
      const response = await fetch(`fotografias/crear/${idproducto}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const newFoto = await response.json();
        console.log('New photograph:', newFoto);
        alert('Image uploaded successfully.');
      } else {
        const errorData = await response.json();
        console.error('Upload error:', errorData);
        alert('Image upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading the image.');
    }
  }


  ngOnInit(): void {
    if (this.datosDialog && this.datosDialog.id) {
      this.obtenerProducto(this.datosDialog.id);
    }
  }
  // showSuccessMessage(message: string) {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 5000, 
  //     panelClass: 'success-snackbar' 
  //   });
  // }
  close(){
    this.dialogRef.close();
  }
 
  onFilesSelected(fileInput: HTMLInputElement): void {
    const selectedFiles = fileInput.files;
    if (selectedFiles) {
      this.selectedFiles = Array.from(selectedFiles);
    }
    console.log('fotos seleccionadas nombres:', selectedFiles)
  }
}