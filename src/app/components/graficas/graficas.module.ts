import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficasRoutingModule } from './graficas-routing.module';
import { GraficasComponent } from './graficas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    GraficasComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    GraficasRoutingModule,
    HighchartsChartModule,
    MaterialModule

  ]
})
export class GraficasModule { }
