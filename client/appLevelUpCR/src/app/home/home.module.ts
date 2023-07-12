import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    InicioComponent,
    AcercaDeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    CarouselModule,
    SlickCarouselModule

  ],
  exports: [
    InicioComponent,
    AcercaDeComponent
  ]
})
export class HomeModule { }
