import { Component, OnInit,AfterViewInit ,ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import Chart from 'chart.js/auto';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { tap } from 'rxjs/operators';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit,AfterViewInit {
  currentUser: any;
  mes: string;
  numeroMes:number;
  cantCompras:number;
  mejorClienteSelected:any;
  mejorProducto:any;
  masVendidoSelected:any;
  fotosMasVendidoSelected:any;
  //Datos para mostrar en el gráfico
  datos: any;
  //Canvas para el grafico
  canvas: any;
  //Contexto del Canvas
  ctx: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,private gService:GenericService,private router: Router,
    private activeRouter: ActivatedRoute,private noti: NotificacionService,
    private authService: AuthenticationService,
  ) { 
    const fechaActual = new Date();
    const opcionesDeFormato: Intl.DateTimeFormatOptions = { month: 'long' }; // Cambiado el tipo a Intl.DateTimeFormatOptions
    this.mes = fechaActual.toLocaleDateString('es', opcionesDeFormato);
    this.numeroMes=parseInt(fechaActual.toLocaleDateString('es', { month: 'numeric' }));
  }
  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    if (this.isVendedor) {
      this.inicioGrafico2();
      this.mejorCliente();
      this.masVendido();

    }
    if (this.isAdmin) {
      this.cantComprasHoy();
      this.inicioGrafico();
    }
    
  }

  ngAfterViewInit(): void {
    this.fotosMasVendido(this.masVendidoSelected[0].idProducto)
  }
  fotosMasVendido(id:number){
    console.log(id)
    this.gService
    .get('fotosproductos',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.fotosMasVendidoSelected=data;
      console.log(this.fotosMasVendidoSelected[0].Foto)
    })
  }
  masVendido(){
    let idVendedor=this.currentUser?.user.idUsuario
    this.gService
    .get('pedidos/masVendido',idVendedor)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.masVendidoSelected=data;
      console.log(this.masVendidoSelected[0])
      
    })
  }

  mejorCliente(){
    let idVendedor=this.currentUser?.user.idUsuario
    console.log(this.currentUser?.user.idUsuario)
    this.gService
    .get('pedidos/mejorCliente',idVendedor)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.mejorClienteSelected=data;
      console.log(this.mejorClienteSelected[0].nombre)
    })
  }
  cantComprasHoy(){
    this.gService
    .list('pedidos/cantHoy')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.cantCompras=data.length;
    })
  }
  inicioGrafico(){
    this.gService
    .get('pedidos/vProducto',this.numeroMes)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.datos=data;
      this.graficoBrowser();
    })
  }

  inicioGrafico2(){
    this.gService
    .get('pedidos/vProducto',this.numeroMes)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.datos=data;
      this.graficoBrowser();
    })
  }

  graficoBrowser(): void {
    this.canvas=this.graficoCanvas.nativeElement;
    console.log(this.canvas)
    this.ctx = this.canvas.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico){
     this.grafico.destroy();
    }
    this.grafico= new Chart(this.ctx,{
     type:'bar',
     data:{
       //Etiquetas debe ser un array
       labels: this.datos.map(x => x.nombre),
       
       datasets:[
         {
           backgroundColor: [
            'rgb(184, 0, 0)',
            'rgb(0, 1, 75)',
            
         ],
         //Datos del grafico, debe ser un array
         data: this.datos.map(x => x.suma)
         },
       ]
     },
         options:{
           responsive:false,
           maintainAspectRatio: false,
           indexAxis: 'y',
           
         },
       
    });
   }
   
  images = [
    { image: './assets/images/PS5.jpg' },
    { image: './assets/images/Switch.jpg' },
    { image: './assets/images/Xbox.jpg' }
  ];

  carouselConfig = {
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true
  };

  

  

  isAdmin(): boolean {
    const roles = this.currentUser?.user.role || [];
    return roles.some(role => role.idRol === 1);
  }

  isCliente(): boolean {
    const roles = this.currentUser?.user.role || [];
    return roles.some(role => role.idRol === 2);
  }

  isVendedor(): boolean {
    const roles = this.currentUser?.user.role || [];
    return roles.some(role => role.idRol === 3);
  }

  isUserNull(): boolean{
    const roles = this.currentUser?.user.role||null
    if(roles===null){
      return true
    }
    return false
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
