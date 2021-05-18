import { Injectable } from '@angular/core';
import { GlobalConstants } from '@app/common/global-constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }
  public  traeproductos(){
    return this.http.get(GlobalConstants.apiURL+ 'producto');
   }
   public  traeproducto(idproducto){
    return this.http.get(GlobalConstants.apiURL+ 'producto/' + idproducto);
   }
   public  categorias(idproducto){
    return this.http.get(GlobalConstants.apiURL+ 'producto/' + idproducto + "/categoria" );
   }
   public  atributos(idproducto){
    return this.http.get(GlobalConstants.apiURL+ 'producto/' + idproducto  + "/atributo");
   }
   public  existencia(idproducto){
    return this.http.get(GlobalConstants.apiURL+ 'inventario/producto/' + idproducto );
   }   
   public  productoscategoria(idcategoria){
    return this.http.get(GlobalConstants.apiURL+ 'producto/categoria/' + idcategoria );
   }
   public  guardarproducto(producto){
    return this.http.post(GlobalConstants.apiURL+ 'producto',producto );
   }
   public  actualizarproducto(producto){
    return this.http.put(GlobalConstants.apiURL+ 'producto/' + producto.Id_Producto,producto );
   }
   public  eliminarproducto(idproducto){
    return this.http.delete(GlobalConstants.apiURL+ 'producto/' + idproducto );
   }
   
}
