import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { DatosGeneralesService } from '@app/services/datos-generales.service';
import { UsuarioService } from '@app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signinForm: FormGroup;
  errores:boolean;
  registroexitoso:boolean=false;
  mensaje:String;
  constructor(private usuario: UsuarioService,private auth: AuthService, private router: Router ,public fb: FormBuilder, public datosGenerales: DatosGeneralesService) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
      username: ['']
    })
   }

  ngOnInit() {
  }
  registrarCuenta() {

    this.auth.singup(this.signinForm.value).subscribe(data=>{
      console.log()

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
