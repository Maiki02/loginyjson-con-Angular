import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {tap} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService:AuthService, private router:Router){
    this.verificarSiEstaLogueado();
  }
  
  IngresarConGoogle():void{
    this.authService.loginWithGoogle().then(res => {
    this.verificarSiEstaLogueado();

    })

  }

  verificarSiEstaLogueado(){
   this.authService.getUserLogged().pipe(
    tap( (usuario: any)=>{
        if(usuario!=null){
          this.irAInicio();
        }
      })
   ).subscribe();
  }


  irAInicio(): void{
    this.router.navigate(['/inicio']);
  }

  logout(): void{
    this.authService.logout();
  }
  
  

}
