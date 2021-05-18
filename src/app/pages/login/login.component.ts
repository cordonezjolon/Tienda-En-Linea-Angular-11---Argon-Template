import { DatosGeneralesService } from '@services/datos-generales.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '@services/usuario.service';
import { AuthService } from '@services/auth.service';
import { FormBuilder, FormGroup ,ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  errores:boolean;
  mensaje:String;
  constructor(
    private datosgenerales:DatosGeneralesService,private usuario: UsuarioService,private auth: AuthService, private router: Router ,public fb: FormBuilder, public datosGenerales: DatosGeneralesService) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {

  }
  ngOnDestroy() {

  }
  loginUser() {
    this.datosgenerales.deletesession();
    this.auth.signIn(this.signinForm.value).subscribe(data=>{
     
      
     if(data.hasOwnProperty('token')){
      this.datosGenerales.setToken(data.token);
      this.auth.userbyemail(this.signinForm.value.email).subscribe(user=>{
        this.mensaje = '';
        this.errores=false;
        this.datosGenerales.setUserInfo(JSON.stringify(user[0]) );
        console.log(user);
        console.log(user[0].Id_TipoUsuario)
       if(user[0].Id_TipoUsuario==2){
        this.router.navigateByUrl('/admin/dashboard');
       }else
       {
        this.router.navigateByUrl('/store/tienda/0');
       }
        
      
        
      })
     }
      else{
        this.mensaje = data.error;
        this.errores=true;
      }
      
    });
   
  }
}
