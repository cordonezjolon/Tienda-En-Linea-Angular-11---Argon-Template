import { Inject, Component, OnInit, ElementRef } from '@angular/core';
import { DOCUMENT, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '@app/services/carrito.service';
import { DatosGeneralesService } from '@app/services/datos-generales.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  datosusuario;
  usuariologueado:boolean=false;
  productoscarrito;
  totalproductoscarrito:number=0;
  totalpagar:number=0;
  proceso:number=1;
  tipopago:number= 1;
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router,
    private datosgenerales:DatosGeneralesService,private carritoservice:CarritoService) { }

    ngOnInit() {
      this.totalpagar=0;
     
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
    eliminarCarrito(idcarrito){
      this.carritoservice.eliminarCarrito(idcarrito).subscribe(data=>{
        this.ngOnInit();
      })
    }
    cambiarProceso(proceso){
      this.proceso = proceso;
    }
    cambioRadio(){
    this.tipopago=1;
    }
    cambioRadio2(){
      this.tipopago=2;
    }
    confirmarCompra(idproceso){
      this.proceso= idproceso;
      this.eliminarcarritocompleto()
    }
    eliminarcarritocompleto(){
        for(var i = 0; i < this.productoscarrito.length; i++){
          console.log('Id_carrito',this.productoscarrito[i].Id_Carrito)
          this.eliminarCarrito(this.productoscarrito[i].Id_Carrito);
        }
    }
}
