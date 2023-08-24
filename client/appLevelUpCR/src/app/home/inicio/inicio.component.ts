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
  canvas2: any;
  canvas3: any;
  canvas4: any;
  //Contexto del Canvas
  ctx: any;
  ctx2: any;
  ctx3: any;
  ctx4: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  @ViewChild('graficoTop5') graficoTop5!: { nativeElement: any };
  @ViewChild('graficoTop3') graficoTop3!: { nativeElement: any };
  @ViewChild('graficoCant') graficoCant!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  grafico2: any;
  grafico3: any;
  grafico4: any;
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
    
    if (this.isVendedor()) {
      
      this.mejorCliente();
      this.masVendido();

    }
    if (this.isAdmin()) {
      this.cantComprasHoy();
      this.inicioGrafico();
      this.iniciarTop5();
      this.iniciarTop3();
    }
    
  }

  ngAfterViewInit(): void {
    if (this.isVendedor()) {
      this.inicioGrafico2();
      if(this.masVendidoSelected.length>0){
        this.fotosMasVendido(this.masVendidoSelected[0].idProducto)
      }
    
  }
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
    .subscribe((data?:any)=>{
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
      console.log(data.length)
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
    .get('evaluacion/countCalificaciones',this.currentUser?.user.idUsuario)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.datos=data;
      console.log(this.datos)
      this.graficoBrowser4();
    })
  }

  iniciarTop5(){
    this.gService
    .list('evaluacion/top5')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.datos=data;
      console.log(data)
      this.graficoBrowser2();
    })
  }

  iniciarTop3(){
    this.gService
    .list('evaluacion/top3')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.datos=data;
      console.log(data)
      this.graficoBrowser3();
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

   graficoBrowser2(): void {
    this.canvas2=this.graficoTop5.nativeElement;
    console.log(this.canvas2)
    this.ctx2 = this.canvas2.getContext('2d');

    this.canvas2.width = this.canvas2.offsetWidth;
    this.canvas2.height = this.canvas2.offsetHeight;
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico2){
     this.grafico2.destroy();
    }
    this.grafico2= new Chart(this.ctx2,{
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
         data: this.datos.map(x => x.promedio)
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

   graficoBrowser3(): void {
    this.canvas3=this.graficoTop3.nativeElement;
    console.log(this.canvas3)
    this.ctx3 = this.canvas3.getContext('2d');

    
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico3){
     this.grafico3.destroy();
    }
    this.grafico3= new Chart(this.ctx3,{
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
         data: this.datos.map(x => x.promedio)
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

   graficoBrowser4(): void {
    this.canvas4=this.graficoCant.nativeElement;
    console.log(this.canvas4)
    this.ctx4 = this.canvas4.getContext('2d');

    
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico4){
     this.grafico4.destroy();
    }
    this.grafico4= new Chart(this.ctx4,{
     type:'pie',
     data:{
       //Etiquetas debe ser un array
       labels: this.datos.map(x => x.calificacion),
       
       datasets:[
         {
           backgroundColor: [
            'rgb(184, 0, 0)',
            'rgb(0, 1, 75)',
            'rgb(0, 0, 0)',
            
         ],
         //Datos del grafico, debe ser un array
         data: this.datos.map(x => x.cantidad)
         },
       ]
     },
         options:{
           responsive:false,
           maintainAspectRatio: false,
           
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
