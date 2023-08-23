import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { LevelUpCRModule } from './level-up-cr/level-up-cr.module';
import { ToastrModule } from 'ngx-toastr';
import { ProductosModule } from './productos/productos.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PedidosModule } from './pedidos/pedidos.module';
import { FotosProductosModule } from './fotos-productos/fotos-productos.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { EvaluacionesModule } from "./evaluaciones/evaluaciones.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule, 
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    FotosProductosModule,
    LevelUpCRModule,
    ProductosModule,
    PedidosModule,
    EvaluacionesModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
