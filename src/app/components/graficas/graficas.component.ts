import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
    text: 'Proceso de construcción',
    x: -20 //center
}, subtitle: {
  text: 'Edificio 7',
  x: -20
},
data: {
  startColumn: 5
},


xAxis: {
  labels: {
    enabled: false
},
  title: {
    text: 'Dias'
},
  categories: ['1 de Febrero', '2 de Febrero', '3 de Febrero', '4 de Febrero', '5 de Febrero',
  '6 de Febrero', '7 de Febrero', '8 de Febrero', '9 de Febrero', '10 de Febrero',
  '11 de Febrero', '12 de Febrero']
}, yAxis: {
  title: {
      text: 'Porcentaje'
  },
  plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
  }],
  max:100
},  tooltip: {
  valueSuffix: '%'
},

    series: [{
      name: "Ejecucion",
      data: [2,4,5,7,10,20],
      type: 'area'
    }, {
      name: 'Planificacion',
      data: [2,4,6,8,11,22, 30, 42, 46, 49, 56, 60, 65,72, 81, 90, 95, 100],
      type: 'line'
    }, {
      name: 'Proyeccion',
      data: [2,4,5,7,10,20, 25, 34, 40, 45, 50, 55, 60, 65,70,75,80,84,90, 94, 100 ],
      type: 'line'
    }] }

  constructor() { }

  ngOnInit(){
  }

}
