import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
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
}
