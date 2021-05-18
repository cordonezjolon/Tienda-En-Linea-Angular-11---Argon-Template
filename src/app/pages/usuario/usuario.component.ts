import { CatalogosService } from '@services/catalogos.service';
import { DatosGeneralesService } from '@services/datos-generales.service';
import { UsuarioService } from '@services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule, FormsModule,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Usuario } from '@app/interfaces/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios;
  proceso:number=1;
  usuario:Usuario={};
  NuevoUsuario: FormGroup;
  datosusuario:any;
  departamentos:any;
  municipios:any;
  municipiousuario:any;
  errores:boolean=false;
  mensajenuevo:String;
  constructor(private usuarioservice:UsuarioService,public fb: FormBuilder, private datosgenerales:DatosGeneralesService,
            private catalogosservice:CatalogosService) {
    
              

    this.datosusuario= this.datosgenerales.getUserInfo();
    
    this.NuevoUsuario = this.fb.group({
      PrimerNombre: [this.usuario.PrimerNombre,Validators.required],
      SegundoNombre: [this.usuario.SegundoNombre],
      PrimerApellido: [this.usuario.PrimerApellido,Validators.required],
      SegundoApellido: this.usuario.SegundoApellido,
      Direccion: this.usuario.Direccion,
      Telefono: this.usuario.Telefono,
      DireccionEntrega: this.usuario.DireccionEntrega,
      NombreFacturacion: this.usuario.NombreFacturacion,
      NIT: this.usuario.NIT,
      DireccionFactura: this.usuario.DireccionFactura,
      Id_Departamento: 1,
      Id_Municipio: this.usuario.Id_Municipio,
      Id_UsuarioCrea: this.datosusuario.Id_Usuario,
      Id_UsuarioModifica: this.datosusuario.Id_Usuario,
      Id_Usuario: this.usuario.Id_Usuario,
      Fotografia: this.usuario.Fotografia,
    })
   }

  ngOnInit(): void {  
    
  this.traeUsuarios()
  this.traedepartamentos();
  
  }
  traeUsuarios(){
    this.usuarioservice.traeUsuarios().subscribe(data=>{
     this.usuarios= data;
    })
  }
  traedepartamentos(){
    this.catalogosservice.traedepartamentos().subscribe(data=>{
        this.departamentos= data;
        console.log(this.departamentos[0].Id_Departamento,data);
        this.traemunicipios(this.departamentos[0].Id_Departamento);
    })
  }
  traemunicipios(iddepartamento){
    console.log(iddepartamento)
    this.catalogosservice.traemunicipios(iddepartamento).subscribe(data=>{
        this.municipios= data;
    })
  }
  traemunicipio(idmunicipio){
    this.catalogosservice.traemunicipio(idmunicipio).subscribe(data=>{
        this.municipiousuario= data;
        this.usuario.Id_Departamento = this.municipiousuario.Id_Departamento;
        this.traedepartamentos();
    })
  }
  cambiaproceso(proceso){
    this.proceso=proceso;
    console.log(proceso);
  }
  crearproducto(){
    if(this.NuevoUsuario.valid) {
     if(this.proceso==2){
      this.usuarioservice.guardarusuario(this.NuevoUsuario.value).subscribe(data=>{
        console.log('usuario guardado',data);
        if(data.hasOwnProperty('Id_Usuario')){
          this.traeUsuarios();
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
      this.usuarioservice.actualizarusuario(this.NuevoUsuario.value).subscribe(data=>{
        console.log('producto guardado',data);
        if(data.hasOwnProperty('Id_Usuario')){
          this.traeUsuarios();
          this.cambiaproceso(1);
          this.errores = false;
          this.NuevoUsuario.reset();
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
  EditarProducto(idusuario){
    console.log(idusuario);
    
    this.cambiaproceso(3);
  this.usuarioservice.traeusuario(idusuario).subscribe(data=>{
    
   
   
    this.usuario= data;
    this.traemunicipio(this.usuario.Id_Municipio);
    console.log(this.usuario);
    this.NuevoUsuario.patchValue({
      PrimerNombre: this.usuario.PrimerNombre,
      SegundoNombre: this.usuario.SegundoNombre,
      PrimerApellido: this.usuario.PrimerApellido,
      SegundoApellido: this.usuario.SegundoApellido,
      Direccion: this.usuario.Direccion,
      Telefono: this.usuario.Telefono,
      DireccionEntrega: this.usuario.DireccionEntrega,
      NombreFacturacion: this.usuario.NombreFacturacion,
      NIT: this.usuario.NIT,
      DireccionFactura: this.usuario.DireccionFactura,
      Id_Departamento: this.usuario.Id_Departamento,
      Id_Municipio: this.usuario.Id_Municipio,
      Id_UsuarioCrea: this.datosusuario.Id_Usuario,
      Id_UsuarioModifica: this.datosusuario.Id_Usuario,
      Id_Usuario: this.usuario.Id_Usuario,
      Fotografia: this.usuario.Fotografia,
    })
  })
   
  }
  eliminarProducto(idusuario){
    this.usuarioservice.eliminarusuario(idusuario).subscribe(data=>{
      this.traeUsuarios();
    })
  }
}
