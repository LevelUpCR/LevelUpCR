import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  // URL del API, definida en enviroments->enviroment.ts
  urlAPI: string = environment.apiURL;
  //Información usuario actual
  currentUser: any;

  //Inyectar cliente HTTP para las solicitudes al API
  constructor(private http: HttpClient) {
   
  }
 
  // Listar
  list(endopoint: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + endopoint);
  }
  // Obtener
  get(endopoint: string, filtro: any): Observable<any | any[]> {
    return this.http.get<any | any[]>(this.urlAPI + endopoint + `/${filtro}`);
  }
  // crear
  create(endopoint: string, objCreate: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(this.urlAPI + endopoint, objCreate);
  }

  // Crear (with file upload support)
  createfoto(endopoint: string, objCreate: any | any, files?: File): Observable<any | any[]> {
    const formData: FormData = new FormData();

    console.log(objCreate);
    // Add the object to be created in the request body
    formData.append('body', objCreate );

    

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    return this.http.post<any | any[]>(this.urlAPI + endopoint, formData);
  }

  // actualizar
  update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    return this.http.put<any | any[]>(
      this.urlAPI + endopoint + `/${objUpdate.id}`,
      objUpdate
    );
  }

  disable(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    console.log(this.urlAPI + endopoint + `/${objUpdate}`);
    return this.http.put<any | any[]>(
      this.urlAPI + endopoint + `/${objUpdate}`,
      objUpdate
    );
  }

}