import { Component, OnInit } from '@angular/core';
import { BusyService } from '@remult/angular';
import { DataAreaSettings, DataControl, GridSettings } from '@remult/angular/interfaces';
import { Fields, getFields, Remult } from 'remult';


import { Product } from '../products/product';

@Component({
    selector: 'app-search-field-with-data-grid',
    styleUrls: ['../full-page-layout/full-page-layout.component.scss'],// see the full page layout example for info
    template: `
    <div class="full-page">
     <data-area [settings]="area"></data-area>
     <data-grid [settings]="products" class="grow-item" ></data-grid>
    </div>
  `,
    styles: []
})
export class SearchFieldWithDataGridComponent {

    constructor(private remult: Remult, private busy: BusyService) { }
    products = new GridSettings(this.remult.repo(Product), {
        where: () => ({
            name: { $contains: this.searchString }
        })
    });

    @DataControl<SearchFieldWithDataGridComponent>({
        valueChange: async (self) => {
            // the call to `this.busy.donotWait` causes the load products method to run without the "Busy" circle in the ui
            await self.busy.donotWait(async () => await self.products.reloadData());
        }
    })
    @Fields.string({
        caption: 'search product name',
    })
    searchString = '';


    area = new DataAreaSettings({
        fields: () => {
            const f = getFields(this);
            return [f.searchString]
        }
    })
}