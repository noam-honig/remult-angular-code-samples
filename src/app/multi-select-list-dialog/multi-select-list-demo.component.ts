import { Component, OnInit } from '@angular/core';
import { openDialog } from '@remult/angular';
import { Remult } from 'remult';
import { Product } from '../products/product';
import { MultiSelectListDialogComponent } from './multi-select-list-dialog.component';


@Component({
    selector: 'app-server-side-search-selection-dialog-demo',
    template: `
    selected product ids: {{selectedIds()}}
    <br>
    Selected Product Name: {{selectedNames()}}
    <br>
    <button mat-raised-button (click)="showSelectionDialog()">Select Product</button>
  `,
    styles: []
})
export class MultiSelectListDialogDemoComponent {
    constructor(private remult: Remult) { }
    selectedProducts: Product[] = [];

    async showSelectionDialog() {
        const products = await this.remult.repo(Product).find();
        await openDialog(MultiSelectListDialogComponent,
            dialog => dialog.args({
                values: products,
                getCaption: x => x.name,
                onSelect: selectedProducts => {
                    this.selectedProducts = selectedProducts;

                }
            }));
    }
    selectedIds() {
        return this.selectedProducts.map(x => x.id).join(', ');
    }
    selectedNames() {
        return this.selectedProducts.map(x => x.name).join(', ');
    }
}
