import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person/person.component';
import { MaterialModule } from 'src/app/material.module';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    PersonComponent
  ],
  imports:[
    CommonModule,
    MaterialModule,
    DataTablesModule,
  ]
})
export class PersonsModule { }
