import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonsService } from './services/persons.service';
import { AuthService } from 'src/app/services/auth.service';
import {tap} from 'rxjs/operators';
import {Person} from './interface/person.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})

export class PersonsComponent implements OnInit, OnDestroy {
  persons!: Person[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  usserLogged=this.authService.getUserLogged();

  constructor(private personSvc: PersonsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.personSvc.getPersons().pipe(
      tap((persons: Person[]) => this.persons = persons )).subscribe();
  }

  ngOnDestroy(): void {

  }

}
