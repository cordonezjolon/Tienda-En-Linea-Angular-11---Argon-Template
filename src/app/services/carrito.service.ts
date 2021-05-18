import { Injectable } from '@angular/core';
import { GlobalConstants } from '@app/common/global-constants';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http:HttpClient) { }
  public  productoscarrito(idusuario){
    return this.http.get(GlobalConstants.apiURL+ 'carrito/usuario/' + idusuario );
   }

   public  agregarProducto(producto){
    return this.http.post(GlobalConstants.apiURL+ 'carrito' ,producto );
   }
   public  eliminarCarrito(idcarrito){
    return this.http.delete(GlobalConstants.apiURL+ 'carrito/' + idcarrito );
   }
}
