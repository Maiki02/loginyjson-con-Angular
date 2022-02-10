import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { 

    this.verificarSiEstaLogueado();

  }

  ngOnInit(): void {
  }

  verificarSiEstaLogueado() :void {
    this.authService.getUserLogged().pipe(
      tap( (usuario: any)=>{
          console.log(usuario);
          if(usuario==null){
            this.irAlLogin();
          }
        })
     ).subscribe();

  }

  irAlLogin():void{

    this.router.navigate(['/login']);
  }

}
