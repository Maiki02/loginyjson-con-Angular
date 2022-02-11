import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficasRoutingModule } from './graficas-routing.module';
import { GraficasComponent } from './graficas.component';

import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    GraficasComponent
  ],
  imports: [
    CommonModule,
    GraficasRoutingModule,
    HighchartsChartModule,

  ]
})
export class GraficasModule { }
