import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '@common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  
  public  traeUsuarios(){
    return this.http.get(GlobalConstants.apiURL+ 'user' );
   }
   public  traeusuario(idusuario){
    return this.http.get(GlobalConstants.apiURL+ 'user/' + idusuario);
   }
   public  guardarusuario(usuario){
    return this.http.post(GlobalConstants.apiURL+ 'user',usuario );
   }
   public  actualizarusuario(usuario){
    return this.http.put(GlobalConstants.apiURL+ 'user/' + usuario.Id_Usuario,usuario );
   }
   public  eliminarusuario(idusuario){
    return this.http.delete(GlobalConstants.apiURL+ 'user/' + idusuario );
   }
}
