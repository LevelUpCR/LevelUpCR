import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAutenticated:boolean;
  currentUser:any;
  constructor(){

  }
  ngOnInit(): void {
    //Valores de prueba
    this.isAutenticated = false;
    let user = {
      name:'Hector',
      email: 'hsolis@prueba.com'
    }
    this.currentUser = user;
  }
}
