import { Injectable } from '@angular/core';
import { GlobalConstants } from '@app/common/global-constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }
  public  categorias(){
    return this.http.get(GlobalConstants.apiURL+ 'categoria');
   }
}
