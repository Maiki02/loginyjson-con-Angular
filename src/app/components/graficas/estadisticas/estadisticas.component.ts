import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  @Input() obra:any;

  constructor() { }

  ngOnInit(): void {
  }

}
