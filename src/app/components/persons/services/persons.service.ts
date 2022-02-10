import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Person} from '../interface/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private apiUrl='http://localhost:3000/personas';
  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]>{
    return this.http.get<Person[]>(this.apiUrl);
  }
}
