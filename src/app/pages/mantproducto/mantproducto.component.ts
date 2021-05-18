import { DatosGeneralesService } from '@services/datos-generales.service';
import { ProductoService } from '@services/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule, FormsModule,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Producto } from '@app/interfaces/producto';
@Component({
  selector: 'app-mantproducto',
  templateUrl: './mantproducto.component.html',
  styleUrls: ['./mantproducto.component.css']
})
export class MantproductoComponent implements OnInit {
  productos;
  proceso:number=1;
  producto:Producto={};
  NuevoProducto: FormGroup;
  datosusuario:any;
  errores:boolean=false;
  mensajenuevo:String;
  constructor(private productoservice:ProductoService,public fb: FormBuilder, private datosgenerales:DatosGeneralesService) { 
    this.datosusuario= this.datosgenerales.getUserInfo();
    
    this.NuevoProducto = this.fb.group({
      Nombre: [this.producto.Nombre,Validators.required],
      Descripcion: [this.producto.Descripcion,Validators.required],
      DescripcionDetalle: this.producto.DescripcionDetalle,
      Precio: [this.producto.Precio,Validators.required],
      Id_Descuento: this.producto.Id_Descuento,
      DisponibleBajoPedido: this.producto.DisponibleBajoPedido,
      Fotografia: [this.producto.Fotografia,Validators.required],
      Id_UsuarioCrea: this.datosusuario.Id_Usuario,
      Id_UsuarioModifica: this.datosusuario.Id_Usuario,
      Id_Producto: this.producto.Id_Producto,
    })

  }

  ngOnInit(): void {
    this.traeProductos()
  }
  
  traeProductos(){
    this.productoservice.traeproductos().subscribe(data=>{
     this.productos= data;
    })
  }
  cambiaproceso(proceso){
    this.proceso=proceso;
    console.log(proceso);
  }
  crearproducto(){
    if(this.NuevoProducto.valid) {
     if(this.proceso==2){
      this.productoservice.guardarproducto(this.NuevoProducto.value).subscribe(data=>{
        console.log('producto guardado',data);
        if(data.hasOwnProperty('Id_Producto')){
          this.traeProductos();
          this.cambiaproceso(1);
          this.errores = false;
        }
        else{
          this.errores = true;
          this.mensajenuevo= 'Ocurrio un problema al almacenar los datos.';
        }
       })
     }else
     {
      this.productoservice.actualizarproducto(this.NuevoProducto.value).subscribe(data=>{
        console.log('producto guardado',data);
        if(data.hasOwnProperty('Id_Producto')){
          this.traeProductos();
          this.cambiaproceso(1);
          this.errores = false;
        }
        else{
          this.errores = true;
          this.mensajenuevo= 'Ocurrio un problema al almacenar los datos.';
        }
       })
     }
   

    }
    else{
      this.errores = true;
      this.mensajenuevo= 'Debe completar los campos obligatorios. *';
    }
  }
  EditarProducto(idproducto){
    console.log(idproducto);
    this.cambiaproceso(3);
  this.productoservice.traeproducto(idproducto).subscribe(data=>{
    
    this.producto= data[0];
    console.log(this.producto);
    this.NuevoProducto.patchValue({
      Nombre: this.producto.Nombre,
      Descripcion: this.producto.Descripcion,
      DescripcionDetalle: this.producto.DescripcionDetalle,
      Precio: this.producto.Precio,
      Id_Descuento: this.producto.Id_Descuento,
      DisponibleBajoPedido: this.producto.DisponibleBajoPedido,
      Fotografia: this.producto.Fotografia,
      Id_UsuarioCrea: this.datosusuario.Id_Usuario,
      Id_UsuarioModifica: this.datosusuario.Id_Usuario,
      Id_Producto: idproducto,
    })
  })
   
  }
  eliminarProducto(idProducto){
    this.productoservice.eliminarproducto(idProducto).subscribe(data=>{
      this.traeProductos();
    })
  }
}
