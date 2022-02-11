import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficasRoutingModule } from './graficas-routing.module';
import { GraficasComponent } from './graficas.component';

import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [
    GraficasComponent
  ],
  imports: [
    CommonModule,
    GraficasRoutingModule,
    ChartModule

  ]
})
export class GraficasModule { }
