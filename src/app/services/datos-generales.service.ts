import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosGeneralesService {

  constructor() { }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
  getUserInfo(){
    return JSON.parse(localStorage.getItem('user_info'));
  }
  setUserInfo(userinfo){
    localStorage.setItem('user_info', userinfo)
  }
  setToken(token){
    localStorage.setItem('access_token', token)
  }
  deletesession(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')
  }

}
