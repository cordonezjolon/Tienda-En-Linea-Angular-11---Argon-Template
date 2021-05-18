import { isJSDocThisTag } from 'typescript';
import { CarritoService } from '@services/carrito.service';
import { DatosGeneralesService } from '@services/datos-generales.service';
import { Inject, Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { DOCUMENT, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  datosusuario;
  usuariologueado:boolean=false;
  productoscarrito;
  totalproductoscarrito:number=0;
  totalpagar:number=0;
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router,
     private datosgenerales:DatosGeneralesService,private carritoservice:CarritoService
     ,@Inject(DOCUMENT) private document: Document) {
    this.location = location;
  }

  ngOnInit() {
    this.totalpagar=0;
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.datosusuario= this.datosgenerales.getUserInfo();
    this.validarUsuario();
   if(this.usuariologueado){
     this.traercarrito(this.datosusuario.Id_Usuario);
   }
    
  }
  validarUsuario(){
  try {
    if(this.datosusuario.hasOwnProperty('Id_Usuario')){
      this.usuariologueado=true;
          }
          else{
            this.usuariologueado=false;
          }
  } catch (error) {
    this.usuariologueado=false;
  }
 
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
traercarrito(idUsuario){
  this.totalpagar=0;
  this.productoscarrito=[];
  this.carritoservice.productoscarrito(idUsuario).subscribe(data=>{
  this.productoscarrito = data;
  this.totalproductoscarrito=  this.productoscarrito.length;
  for(var i=0;i<this.productoscarrito.length;i++){
    console.log(this.productoscarrito[i].subtotal);
    this.totalpagar = this.totalpagar + parseInt(this.productoscarrito[i].subtotal);
  }
  console.log(this.totalpagar);
  })
  
}
refrescar(){
  this.ngOnInit();
}
eliminarCarrito(idcarrito){
  this.carritoservice.eliminarCarrito(idcarrito).subscribe(data=>{
    this.ngOnInit();
  })
}
salir(){
this.datosgenerales.deletesession();
this.router.navigateByUrl('/login');
}
}
