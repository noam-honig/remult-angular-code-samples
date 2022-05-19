import { Component, OnInit } from '@angular/core';
import { Remult } from 'remult';
import * as xlsx from 'xlsx';//https://sheetjs.com/
import { Product } from '../products/product';

@Component({
  selector: 'app-export-excel',
  template: `
    <button mat-raised-button (click)="doExport()">Export products to excel</button>
  `,
  styles: []
})
export class ExportExcelComponent implements OnInit {

  constructor(private remult: Remult) { }

  ngOnInit() {
  }
  async doExport() {

    let result = [];

    for await (const p of  this.remult.repo(Product).query()) {
      let item:any = {};
      for (const col of p.$) {
        item[col.metadata.caption] = col.value;
      }
      result.push(item);
    }
    let wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(result));
    xlsx.writeFile(wb, "products.xlsx");

  }

}