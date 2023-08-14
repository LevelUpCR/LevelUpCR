import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/share/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  qtyItems: Number = 0;
  constructor(
    private cartService: CartService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.qtyItems = this.cartService.quantityItems();
  }

  ngOnInit(): void {
    //valores de prueba
    // this.isAutenticated = false;
    // let user={
    //   name:"pepito aguacates",
    //   email:"pAguacates@prueba.com",

    // }
    // this.currentUser=user;
    // Subscripcion a la informacion del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Suscriocion a la informacion del usuario actual
    console.log(this.currentUser)
    this.authService.isAuthenticated.subscribe(
      (x) => (this.isAutenticated = x)
    );
    //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });
  }
  login() {
    this.router.navigate(['usuario/login']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['inicio']);
  }

  isCliente(): boolean {
    return this.currentUser?.user.role == "Cliente";
  }

  isVendedor(): boolean {
    return this.currentUser?.user.role == "Vendedor";
  }
  isAdmin(): boolean {
    return this.currentUser?.user.role == "ADMIN";
  }
}
