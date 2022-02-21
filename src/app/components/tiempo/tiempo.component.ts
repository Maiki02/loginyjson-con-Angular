import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ClimaService } from './services/clima.service';
import { Clima, Tiempo } from './interface/clima.interface';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.scss'],
})

export class TiempoComponent implements OnInit {
  datos!: Clima[];
  clima: any = {};
  displayedColumns: string[] = ['date', 'temperature_min', 'temperature_max', 'humidity', 'text'];
  dataSource= new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private climaSvc: ClimaService) {}

  ngOnInit(): void {
    this.cargarElTiempo();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }

  cargarElTiempo() {
    this.climaSvc.getClimas().subscribe((datos: Tiempo) => {
      //La API solamente carga 7 dias a futuro
      const diasConDatos = 7;
      this.datos = [
        datos.day1,
        datos.day2,
        datos.day3,
        datos.day4,
        datos.day5,
        datos.day6,
        datos.day7,
      ];

      for (let i = 0; i < diasConDatos; i++) {
        this.datos[i].date = this.pasarFechaAEspanol(new Date(this.datos[i].date).toISOString());
      }
      this.dataSource.data=this.datos;
      this.clima = datos.hour_hour.hour1;
    });
  }


  //Dada una fecha en formato MM/DD/YYYY, toma cada elemento y la pasa al español en
  //formato humano legible en Español.
  public pasarFechaAEspanol(fecha: string) {
    const meses = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    const date: Date = new Date(fecha);

    let mes = meses[date.getMonth() - 1]; //Le restamos 1 porque si enero es el mes 1 en el arreglo es 0

    let dia = this.calcularDia(Number(date.getDay()));
    return dia + ' ' + mes + ' ' + date.getDate() + ' ' + date.getFullYear();
  }

  //Dado un numero que representa un día de la semana (0 a 6), devuelve su abreviacion.
  //Number -> String
  calcularDia(dia: number): string {
    switch (dia) {
      case 0:
        return 'Dom';
      case 1:
        return 'Lun';
      case 2:
        return 'Mar';
      case 3:
        return 'Mie';
      case 4:
        return 'Jue';
      case 5:
        return 'Vie';
      case 6:
        return 'Sab';
      default:
        return '';
    }
  }

}
