import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '@common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(private http: HttpClient) { }
  
   public  signIn(usuario){
  return   this.http.post<any>(GlobalConstants.apiURL+ 'login',usuario);
   }
   public  singup(usuario){
    return   this.http.post<any>(GlobalConstants.apiURL+ 'register',usuario);
     }
   public userbyemail(email){
    
    return  this.http.get<any>(GlobalConstants.apiURL+ 'showbyemail/'+email);
    
   }
}
