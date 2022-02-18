import { Datos } from './../graficas/interface/datos.interface ';
import { ClimaService } from './services/clima.service';
import { Clima } from './interface/clima.interface';
import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.scss']
})
export class TiempoComponent implements OnInit {

  datos!: Clima[];
  displayedColumns: string[] = ['dia', 'temp-max', 'temp-min', 'humedad'];
  dataSource = new MatTableDataSource(this.datos);
  clima : any ={}

  constructor(private _liveAnnouncer: LiveAnnouncer, private climaSvc: ClimaService) {}

  //@ViewChild(MatSort) sort: MatSort;

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  ngOnInit(): void {
    this.cargarElTiempo();
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }

  cargarElTiempo(){
    this.climaSvc.getClimas().subscribe((datos : Clima) => {
      this.clima=datos.hour_hour.hour1;
      console.log(datos.hour_hour.hour1);
      });
  }


}
