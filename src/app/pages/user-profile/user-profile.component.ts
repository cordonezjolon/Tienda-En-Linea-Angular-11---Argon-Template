
import { DatosGeneralesService } from '@services/datos-generales.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from '@app/services/catalogos.service';
import { UsuarioService } from '@app/services/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  datosusuario;
  usuario:Usuario={};
  NuevoUsuario: FormGroup;
  editarperfil:boolean=false;
  departamentos:any;
  municipios:any;
  municipiousuario:any;
  errores:boolean=false;
  mensajenuevo:String;
  constructor(private usuarioservice:UsuarioService,public fb: FormBuilder, private datosgenerales:DatosGeneralesService,
    private catalogosservice:CatalogosService) {
    this.datosusuario= this.datosgenerales.getUserInfo();
    this.usuario= this.datosgenerales.getUserInfo();
    console.log('Datos',this.datosgenerales.getUserInfo());
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

   

  ngOnInit() {
    this.datosusuario= this.datosgenerales.getUserInfo();
    this.usuario= this.datosgenerales.getUserInfo();
  }
  editarUsuario(){
    this.editarperfil=true;
    this.EditarUsuario(this.usuario.Id_Usuario);
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
  EditarUsuario(idusuario){
    console.log(idusuario);

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
  actualizarPerfil(){
    if(this.NuevoUsuario.valid) {
     
      this.usuarioservice.actualizarusuario(this.NuevoUsuario.value).subscribe(data=>{
        console.log('producto guardado',data);
        if(data.hasOwnProperty('Id_Usuario')){
          this.datosgenerales.setUserInfo(JSON.stringify(data));
          this.ngOnInit();
         // this.traeUsuarios();
          //this.cambiaproceso(1);
          this.errores = false;
          this.editarperfil=false;
        }
        else{
          this.errores = true;
          this.mensajenuevo= 'Ocurrio un problema al almacenar los datos.';
        }
       })
     
   

    }
    else{
      this.errores = true;
      this.mensajenuevo= 'Debe completar los campos obligatorios. *';
    }
  }
}
