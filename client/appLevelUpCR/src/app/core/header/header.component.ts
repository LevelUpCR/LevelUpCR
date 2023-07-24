import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/share/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  qtyItems:Number = 0;
  constructor(private cartService: CartService,
    private router: Router) {
    //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.qtyItems=this.cartService.quantityItems()
  }

  ngOnInit(): void {
    //valores de prueba
    this.isAutenticated = false;
    let user={
      name:"pepito aguacates",
      email:"pAguacates@prueba.com",

    }
    this.currentUser=user; 
     //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.cartService.countItems.subscribe((value)=>{
      this.qtyItems=value
    })
  }
}
