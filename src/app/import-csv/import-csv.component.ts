import { Component } from '@angular/core';
import Papa from 'papaparse'; //https://www.papaparse.com/
import { ImportCsvController } from './import-csv.controller';

@Component({
  selector: 'app-import-csv',
  template: `
      <input #fileInput type="file" (input)="onFileInput($event)" />
      <br>
      <a href="/assets/products.csv">Click here for a sample csv file</a>
  `,
  styles: [],
})
export class ImportCsvComponent {
  async onFileInput(eventArgs: any) {
    for (const file of eventArgs.target.files) {
      let f: File = file;
      await new Promise((res) => {
        var fileReader = new FileReader();
        fileReader.onload = async (e: any) => {
          var parseResult = Papa.parse<any>(e.target.result);
          let processed = await ImportCsvController.importProductsArray(
            parseResult.data
          );
          alert('loaded ' + processed + ' products');
        };
        fileReader.readAsText(f);
      });
      return; //to import the first file only
    }
  }
}
