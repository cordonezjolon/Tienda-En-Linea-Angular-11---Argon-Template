import { DatosGeneralesService } from '@services/datos-generales.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  ruta:String;
  constructor(
    private router: Router
    , private datosgeneralesservice:DatosGeneralesService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('access_token');
     const usuario:{} = this.datosgeneralesservice.getUserInfo();

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
        authorization: `Bearer ${ token }`
        ,'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        this.ruta= this.router.url;
        if(this.ruta.includes('tienda')){
          
        }else
        {
        if(usuario.hasOwnProperty('Id_Usuario')){

        }
        else{
          this.router.navigateByUrl('/login');
        }
        }


        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError( err );

      })
    );
  }

}