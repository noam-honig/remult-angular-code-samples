import { Component, OnInit } from '@angular/core';
import { GridSettings } from '@remult/angular/interfaces';
import { Remult } from 'remult';
import { Product } from './product';

@Component({
  selector: 'app-products',
  template: `<data-grid [settings]="grid"></data-grid>`
})
export class ProductsComponent implements OnInit {

  constructor(private remult: Remult) { }
  grid = new GridSettings(this.remult.repo(Product), { allowCrud: true });
  ngOnInit(): void {
  }

}
