import { Observable } from 'rxjs';
import { Person } from './../persons/interface/person.interface';
import { Component, OnInit, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  esBotonDesactivado=true;
  nombre:string = "";
  apellido:string="";
  dni:string="";

  //personas!:Observable<Person[]>;
  personas:Person[]=[];
  constructor() { }

  ngOnInit(): void {
  }

  agregarNombre(e:any): void {
    this.nombre = e.target.value;
    this.verificarBoton();
  }

  agregarApellido(e:any): void{
    this.apellido = e.target.value;
    this.verificarBoton();
  }

  agregarDni(e:any): void{
    this.dni = e.target.value.toString();
    this.verificarBoton();
  }

  agregarPersona():void{
    let persona: Person = {
      Nombre: this.nombre,
      Apellido: this.apellido,
      Dni: this.dni

    };
    this.personas.push(persona);
    this.reiniciarInputs();

  }

  verificarBoton(): void{
    if(this.nombre=="" || this.apellido=="" || this.dni=="0" || this.dni==""){
      this.esBotonDesactivado=true;
    } else {
      this.esBotonDesactivado=false;
    }
  }

  reiniciarInputs():void{
    this.nombre="";
    this.apellido="";
    this.dni="";
  }

}
