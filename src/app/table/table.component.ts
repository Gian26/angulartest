import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  array: Product[] = [
    {folio: '1', servicio: '1', serieInicial: '1', serieFinal: '1', cantidad: 20, estado: false},
    {folio: '2', servicio: '2', serieInicial: '2', serieFinal: '2', cantidad: 30, estado: true},
    {folio: '3', servicio: '3', serieInicial: '3', serieFinal: '3', cantidad: 24, estado: false},
    {folio: '4', servicio: '4', serieInicial: '4', serieFinal: '4', cantidad: 242, estado: true},
  ];


  ngOnInit() {
  }

}
