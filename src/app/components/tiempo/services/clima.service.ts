import { Clima, Tiempo } from './../interface/clima.interface';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClimaService {
  private apiUrl="https://api.tutiempo.net/json/?lan=es&apid=XwY4aq4qzz4vMyj&ll=-32.94682,-60.63932";

  constructor(private http: HttpClient) { }

  getClimas(): Observable<Tiempo>{
    return this.http.get<Tiempo>(this.apiUrl);
  }

}
