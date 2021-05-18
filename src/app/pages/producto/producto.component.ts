import { NavbarComponent } from './../../components/navbar/navbar.component';
import { DatosGeneralesService } from './../../services/datos-generales.service';
import { CarritoService } from '@services/carrito.service';
import { ProductoService } from '@services/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Producto } from "./../../interfaces/producto"
import { isJSDocThisTag } from 'typescript';
@Component({
  providers:[NavbarComponent ],
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
 idproducto:String;
 datosusuario:any;
 producto:Producto= {};
 cantidad:String='1';
 categorias:any;
 atributos:any;
 existencias:any;
 totalexistencia:number=0;
 usuariologueado:boolean=false;
  constructor(private route: ActivatedRoute, private productoservice:ProductoService, private carritoservice:CarritoService
    ,private datosgenerales:DatosGeneralesService, private navbar:NavbarComponent, private router: Router) {
    console.log(this.producto);
    this.idproducto = this.route.snapshot.paramMap.get("idProducto");
    this.datosusuario= this.datosgenerales.getUserInfo();
    this. buscarProducto();
   }

  ngOnInit(): void {
  
  this. caterogiasProducto();
  this. attibutoProducto();
  this.existenciaProducto();
  this. validarUsuario();
  }

  buscarProducto(){
   this.productoservice.traeproducto(this.idproducto).subscribe(data=>{
     this.producto = data[0];
     console.log(this.producto);
   });
  }
  caterogiasProducto(){
    this.productoservice.categorias(this.idproducto).subscribe(data=>{
      this.categorias = data;
      console.log(this.categorias);
    });
  }
  attibutoProducto(){
    this.productoservice.atributos(this.idproducto).subscribe(data=>{
      this.atributos = data;
      console.log(this.atributos);
    });
  }
  existenciaProducto(){
    this.productoservice.existencia(this.idproducto).subscribe(data=>{
      this.existencias = data;
      this.totalexistencia=this.existencias.reduce((prev,next)=>prev+next.Existencia,0)

    });
  }
  agregarProducto(idproducto,cantidad){
    
    if(this.usuariologueado){
      var datos= {Id_UsuarioCrea:this.datosusuario.Id_Usuario,Id_Producto:idproducto,cantidad:cantidad}
      console.log(cantidad);
       this.carritoservice.agregarProducto(datos).subscribe(data=>{
        this.navbar.traercarrito(this.datosusuario.Id_Usuario);
        this.navbar.refrescar();
       })
    }
    else{
      this.datosgenerales.deletesession();
      this.router.navigateByUrl('/login');
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
}
