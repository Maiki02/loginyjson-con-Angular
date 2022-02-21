import { Datos } from './interface/datos.interface ';
import { Point } from './interface/point.interface';
import { PointsService } from './services/points.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import planificacion from '../../../assets/json/planificacion.json';
import ejecucion from '../../../assets/json/ejecucion.json';
import proyeccion from '../../../assets/json/proyeccion.json';
import data from '../../../assets/json/data.json';
import { tap } from 'rxjs';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent implements OnInit {
  private cantMilisegundosEnUnDia: number = 86400000;
  private fechaInicio = 'Feb 1, 2022';
  meses: string[] = [];

  obra = {
    atraso: '',
    porcentajeConstruido: 0,
    bloquesCertificados: 0
  }
  //Array de porcentajes del estado de obra
  planificacionConFecha: any[][] = [];
  proyeccionConFecha: any[][] = [];
  ejecucionConFecha: any[][] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(private pointSvc: PointsService) {
    //Se cargan los datos desde una api previamente lanzada
    //this.cargarDatos();

    //Se cargan los datos desde los archivos previamente guardados
    //this.cargarValores();

    //Se cargan los datos desde un solo archivo json con sus respectivos valores
    //this.cargarData();

    //Se cargan los datos desde un http con datos de un archivo json;
    this.cargarDataDesdeHttpGet();

  }

  ngOnInit() {
    setTimeout(() => {
      this.cargarTabla();
      this.cargarMeses();
      this.calcularAtraso();
      this.calcularPorcentaje();
      this.calcularBloquesCertificados();
    }, 100);
  }

  //Funcion que carga los datos en los arreglos de planificacion, proyeccion y ejecucion
  //Traidos desde un http
  cargarDataDesdeHttpGet(): void {
    this.pointSvc
      .getAll()
      .pipe(
        tap((dataTabla: Datos[]) => {
          let puntos = dataTabla[0].Datos;
          for (let i = 0; i < puntos.length; i++) {
            this.planificacionConFecha.push([
              //new Date(puntos[i].EjeX).toDateString(),
              this.pasarFechaAEspanol(puntos[i].EjeX),
              puntos[i].EjeY,
            ]);
          }

          puntos = dataTabla[1].Datos;
          for (let i = 0; i < puntos.length; i++) {
            this.proyeccionConFecha.push([
              //new Date(puntos[i].EjeX).toDateString(),

              this.pasarFechaAEspanol(puntos[i].EjeX),
              puntos[i].EjeY,
            ]);
          }

          puntos = dataTabla[2].Datos;
          for (let i = 0; i < puntos.length; i++) {
            this.ejecucionConFecha.push([
              //new Date(puntos[i].EjeX).toDateString(),
              this.pasarFechaAEspanol(puntos[i].EjeX),
              puntos[i].EjeY,
            ]);
          }
        })
      )
      .subscribe();
  }

  //Funcion que carga los datos en los arreglos de planificacion, proyeccion y ejecucion
  //Traidos desde un archivo json guardado localmente
  cargarData() {
    let dataTabla = data;
    let puntos = dataTabla[0].Datos;
    for (let i = 0; i < puntos.length; i++) {
      this.planificacionConFecha.push([
        //new Date(puntos[i].EjeX).toDateString(),
        this.pasarFechaAEspanol(puntos[i].EjeX),
        puntos[i].EjeY,
      ]);
    }

    puntos = dataTabla[1].Datos;
    for (let i = 0; i < puntos.length; i++) {
      this.proyeccionConFecha.push([
        //new Date(puntos[i].EjeX).toDateString(),

        this.pasarFechaAEspanol(puntos[i].EjeX),
        puntos[i].EjeY,
      ]);
    }

    puntos = dataTabla[2].Datos;
    for (let i = 0; i < puntos.length; i++) {
      this.ejecucionConFecha.push([
        //new Date(puntos[i].EjeX).toDateString(),
        this.pasarFechaAEspanol(puntos[i].EjeX),
        puntos[i].EjeY,
      ]);
    }
  }

  //Funcion que carga los datos en los arreglos de planificacion, proyeccion y ejecucion
  //Traidos desde 3 archivos json guardados localmente
  /*cargarValores() {
    let puntos = planificacion;
    for (let i = 0; i < puntos.length; i++) {
      this.planificacionConFecha.push([
        this.calcularFecha(puntos[i].EjeX).toDateString(),
        puntos[i].EjeY,
      ]);
    }

    puntos = proyeccion;
    for (let i = 0; i < puntos.length; i++) {
      this.proyeccionConFecha.push([
        this.calcularFecha(puntos[i].EjeX).toDateString(),
        puntos[i].EjeY,
      ]);
    }

    puntos = ejecucion;
    for (let i = 0; i < puntos.length; i++) {
      this.ejecucionConFecha.push([
        this.calcularFecha(puntos[i].EjeX).toDateString(),
        puntos[i].EjeY,
      ]);
    }
  }*/

  //Funcion que carga los datos en los arreglos de planificacion, proyeccion y ejecucion
  //Traidos desde un archivo json lanzado en una Fake Api
  cargarDatos() {
    this.cargarProyeccion();
    this.cargarPlanificacion();
    this.cargarEjecucion();
  }

  //Carga los datos de la proyeccion desde la fakeApi
  cargarProyeccion() {
    let proyeccionPunto: Point[] = [];
    this.pointSvc.getProyeccion().subscribe((proyecciones) => {
      for (let i = 0; i < proyecciones.length; i++) {
        this.proyeccionConFecha.push([
          this.calcularFecha(proyecciones[i].EjeX).toDateString(),
          proyecciones[i].EjeY,
        ]);
      }
    });
  }

  //Carga los datos de la ejecucion desde la fakeApi
  cargarEjecucion() {
    let ejecucionPunto: Point[] = [];
    this.pointSvc.getEjecucion().subscribe((ejecuciones) => {
      for (let i = 0; i < ejecuciones.length; i++) {
        this.ejecucionConFecha.push([
          this.calcularFecha(ejecuciones[i].EjeX).toDateString(),
          ejecuciones[i].EjeY,
        ]);
      }
    });
  }

  //Carga los datos de la planificacion desde la fakeApi
  cargarPlanificacion() {
    let planificacionPunto: Point[] = [];
    this.pointSvc.getPlanificacion().subscribe((planificaciones) => {
      for (let i = 0; i < planificaciones.length; i++) {
        this.planificacionConFecha.push([
          this.calcularFecha(planificaciones[i].EjeX).toDateString(),
          planificaciones[i].EjeY,
        ]);
      }
    });
  }

  //Genera las opciones de la tabla de highcharts
  cargarTabla() {
    this.chartOptions = {
      title: {
        text: 'Proceso de construcción',
      },
      xAxis: {
        categories: this.meses,
      },
      yAxis: {
        title: {
          text: '%',
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080',
          },
        ],
        max: 100,
      },
      tooltip: {
        valueSuffix: '%',
      },

      series: [
        {
          name: 'Ejecucion',
          data: this.ejecucionConFecha,
          type: 'area',
          color: '#43DC5C',
          zIndex: 4,
          marker: { enabled: false },
        },
        {
          name: 'Planificacion',
          data: this.planificacionConFecha,
          type: 'area',
          color: '#CCD1D1',
          zIndex: 1,
          marker: { enabled: false },
        },
        {
          name: 'Proyeccion',
          data: this.proyeccionConFecha,
          type: 'line',
          color: '#0F2A6D',
          zIndex: 3,
          marker: { enabled: false },
        },
      ],
    };
  }

  //Tomala lista de fechas y a cada elemento (entero), hace un calculo y lo pasa a string
  /*crearFechas(){
    const cantFechas=this.fechas.length;
    for(let i=0; i<cantFechas; i++){
      this.fechas[i] = this.pasarFechaAString(i);
    }
  }

  //Dado un numero que representa el indice de la tabla de fecha (entero), devuelve un string
  //Que representa la fecha (con un calculo previo).
  //Number -> String
  pasarFechaAString(index:number): string{
    return this.calcularFecha(this.fechas[index]).toDateString();
  }*/

  //Toma el arreglo proyeccionConFecha (ya que es el arreglo que mas fechas intervienen)
  //Y a cada valor, toma el primer elemento (la fecha), seleccionando el mes y el año
  // y lo agrega a otro arreglo de meses.
  cargarMeses(): void {
    /*let indiceFinal = this.proyeccionConFecha.length - 1;
    let fecha = this.proyeccionConFecha[0][0].split(' ');
    this.meses.push(fecha[1] + ' ' + fecha[3].substring(2, 4));

    fecha = this.proyeccionConFecha[Math.ceil(indiceFinal / 2)][0].split(' ');
    this.meses.push(fecha[1] + ' ' + fecha[3].substring(2, 4));

    fecha = this.proyeccionConFecha[indiceFinal][0].split(' ');
    this.meses.push(fecha[1] + ' ' + fecha[3].substring(2, 4));*/

    if (this.proyeccionConFecha.length > this.planificacionConFecha.length) {
      this.proyeccionConFecha.forEach((punto) => {
        let fecha = punto[0].split(' ');
        this.meses.push(fecha[1] + ' ' + fecha[3].substring(2, 4));
      });
    } else {
      this.planificacionConFecha.forEach((punto) => {
        let fecha = punto[0].split(' ');
        this.meses.push(fecha[1] + ' ' + fecha[3].substring(2, 4));
      });
    }
  }

  //Dado un string que representa una cantidad de días transcurridos, devuelve la Date
  //que surge de calcular cuantos dias pasaron desde una fecha de inicio.
  //String -> Date
  calcularFecha(fecha: String): Date {
    const fechaNumero = Number(fecha);
    return new Date(
      fechaNumero * this.cantMilisegundosEnUnDia + Date.parse(this.fechaInicio)
    );
  }

  //Funcion que agrega un elemento al arreglo de ejecucion y lo actualiza en
  //la tabla de highcharts. Se invoca al hacer click sobre un elemento del DOM (boton).
  agregarCampo() {
    this.ejecucionConFecha.push([new Date().toDateString(), 38]);

    this.chartOptions = {
      series: [
        {
          name: 'Ejecucion',
          data: this.ejecucionConFecha,
          type: 'area',
          color: '#43DC5C',
          zIndex: 4,
          marker: { enabled: false },
        },
      ],
    };
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
    let mes = meses[Number(fecha.split('/')[0]) - 1]; //Le restamos 1 porque si enero es el mes 1 en el arreglo es 0
    const date: Date = new Date(fecha);
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

  //Calcula la cantidad de días desde el ultimo elemento de planificacion con el
  //ultimo elemento de la proyeccion
  calcularAtraso() {
    const fechaFinalProgramada =
      this.planificacionConFecha[this.planificacionConFecha.length - 1][0];
    const fechaFinalEstimada =
      this.proyeccionConFecha[this.proyeccionConFecha.length - 1][0];
    const fechaProgramada = new Date(fechaFinalProgramada);
    const fechaEstimada = new Date(fechaFinalEstimada);
    const diferenciaEnMilisegundos = +fechaEstimada - +fechaProgramada;
    this.obra.atraso =
      diferenciaEnMilisegundos / this.cantMilisegundosEnUnDia + ' dias';
  }

  //Calcula el porcentaje de la construccion de la obra
  calcularPorcentaje() {
    const cantEjecuciones= this.ejecucionConFecha.length
    this.obra.porcentajeConstruido=this.ejecucionConFecha[cantEjecuciones-1][1];
  }

  calcularBloquesCertificados(){
    this.obra.bloquesCertificados=this.ejecucionConFecha.length;
  }
}
