
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {Point} from '../interface/point.interface';
import { Datos } from '../interface/datos.interface ';

@Injectable({
  providedIn: 'root'
})

export class PointsService {
  private apiUrl='http://localhost:3000/';
  private apiHttp='http://localhost:3200/';
  constructor(private http: HttpClient) { }

  getProyeccion(): Observable<Point[]>{
    return this.http.get<Point[]>(this.apiUrl+"proyeccion");
  }

  getPlanificacion(): Observable<Point[]>{
    return this.http.get<Point[]>(this.apiUrl+"planificacion");
  }

  getEjecucion(): Observable<Point[]>{
    return this.http.get<Point[]>(this.apiUrl+"ejecucion");
  }

  getAll(): Observable<Datos[]>{
    return this.http.get<Datos[]>(this.apiHttp);
  }
}
