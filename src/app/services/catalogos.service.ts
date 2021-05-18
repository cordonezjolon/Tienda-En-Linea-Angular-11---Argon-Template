import { Injectable } from '@angular/core';
import { GlobalConstants } from '@app/common/global-constants';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http:HttpClient) { }
  public  traemunicipios(iddepartamento){
    return this.http.get(GlobalConstants.apiURL+ 'municipio/departamento/' + iddepartamento);
   }
   public  traedepartamentos(){
    return this.http.get(GlobalConstants.apiURL+ 'departamento');
   }
   traemunicipio(idmunicipio){
    return this.http.get(GlobalConstants.apiURL+ 'municipio/' + idmunicipio);
   }
   public  traeTiendas(){
    return this.http.get(GlobalConstants.apiURL+ 'tienda');
   }
   public  categorias(){
    return this.http.get(GlobalConstants.apiURL+ 'categoria');
   }
}
