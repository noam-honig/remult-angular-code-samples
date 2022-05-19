import { Component, OnInit } from '@angular/core';
import { openDialog } from '@remult/angular';
import { Remult } from 'remult';
import { Product } from '../products/product';
import { DynamicServerSideSearchDialogComponent } from './dynamic-server-side-search-dialog.component';

@Component({
    selector: 'app-dynamic-server-side-search-dialog-demo',
    template: `
 selected product id: {{product?.id}}
    <br>
    Selected Product Name: {{product?.name}}
    <br>
    <button mat-raised-button (click)="showSelectionDialog()">Select Product</button>  `,
    styles: []
})
export class DynamicServerSideSearchDialogDemoComponent {

    constructor(private remult: Remult) { }
    product?: Product;
    async showSelectionDialog() {
        await openDialog(DynamicServerSideSearchDialogComponent,
            dialog => dialog.args(Product, {
                searchColumn: p => p.name,
                onSelect: selectedProduct =>
                    this.product = selectedProduct
            }));
    }

}