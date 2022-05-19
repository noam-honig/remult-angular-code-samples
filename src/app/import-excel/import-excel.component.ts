import { Component, OnInit } from '@angular/core';
import { Products } from '../products/products';
import * as xlsx from 'xlsx';//https://sheetjs.com/
import { ImportExcelController } from './import-excel.controller';

@Component({
  selector: 'app-import-excel',
  template: `
      <input #fileInput type="file" (input)="onFileInput($event)" />
      <br>
      <a href="/assets/products.xlsx">Click here for a sample excel file</a>
  `,
  styles: []
})
export class ImportExcelComponent {

  async onFileInput(eventArgs: any) {
    for (const file of eventArgs.target.files) {
      let f: File = file;
      await new Promise((res) => {
        var fileReader = new FileReader();

        fileReader.onload = async (e: any) => {

          // pre-process data
          var binary = "";
          var bytes = new Uint8Array(e.target.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // call 'xlsx' to read the file
          var oFile = xlsx.read(binary, { type: 'binary', cellDates: true, cellStyles: true });
          let sheets = oFile.SheetNames;
          var dataArray = xlsx.utils.sheet_to_json(oFile.Sheets[sheets[0]], { header: 1 });



          let processed = await ImportExcelController.importProductsFromExcel(dataArray);
          alert("loaded " + processed + " products");
        };
        fileReader.readAsArrayBuffer(f);
      });
      return;//to import the first file only
    }
  }



}