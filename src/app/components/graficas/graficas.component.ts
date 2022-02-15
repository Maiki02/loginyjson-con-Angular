import { Point } from './interface/point.interface';
import { PointsService } from './services/points.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {
  //Array de porcentajes del estado de obra
  planificacion: number[] = [0];
  ejecucion: number[] = [0];
  proyeccion: number[] = [0];
  fechas: string[] = ['0'];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(private pointSvc:PointsService) {
    this.cargarDatos();
    setTimeout( () => {console.log("Planificacion:" + this.planificacion);
    console.log("Ejecucion:"+ this.ejecucion);
    console.log("Proyeccion"+this.proyeccion);}, 1000 );

  }

  ngOnInit(){
    setTimeout( () => {this.cargarTabla() }, 1000);
  }

  cargarDatos(){
    this.cargarProyeccion();
    this.cargarPlanificacion();
    this.cargarEjecucion();
  }


cargarProyeccion(){
    let proyeccionPunto: Point[]=[];
    this.pointSvc.getProyeccion().subscribe(
      proyecciones => {
        for(let i=0; i<proyecciones.length; i++){
          this.proyeccion.push(proyecciones[i].EjeY);
         }
      }
    );
}

cargarEjecucion(){
    let ejecucionPunto: Point[]=[];
    this.pointSvc.getEjecucion().subscribe(
      ejecuciones => {
        for(let i=0; i<ejecuciones.length; i++){
          this.ejecucion.push(ejecuciones[i].EjeY);
         }
      }
    );
  }

cargarPlanificacion(){
  let planificacionPunto: Point[]=[];
  this.pointSvc.getPlanificacion().subscribe(
    planificaciones => {
      for(let i=0; i<planificaciones.length; i++){
        this.planificacion.push(planificaciones[i].EjeY);
        this.fechas.push(planificaciones[i].EjeX.toString());
       }
    }
  );
}

cargarTabla(){
  this.chartOptions = {
      title: {
      text: 'Proceso de construcción',
      x: -20 //center
  }, subtitle: {
    text: 'Edificio 7',
    x: -20
  },

  xAxis: {

    labels: {
      enabled: false,
  },
    title: {
      text: 'Dias'
  },
    categories: this.fechas
  },
  yAxis: {
    title: {
        text: 'Porcentaje'
    },
    plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
    }],
    max:100
  },
  tooltip: {
    valueSuffix: '%'
  },


  series: [{
    name: "Ejecucion",
    data: this.ejecucion,
    type: 'area',
    color: '#43DC5C'
  }, {
    name: 'Planificacion',
    data: this.planificacion,
    type: 'line',
    color: '#CCD1D1'
  }, {
    name: 'Proyeccion',
    data: this.proyeccion,
    type: 'line',
    color: '#43DC5C'
  }]



}



}

}
