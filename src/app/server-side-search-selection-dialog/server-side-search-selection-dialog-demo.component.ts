import { Component, OnInit } from '@angular/core';
import { openDialog } from '@remult/angular';
import { Remult } from 'remult';
import { Product } from '../products/product';
import { ServerSideSearchSelectionDialogComponent } from './server-side-search-selection-dialog.component';

@Component({
    selector: 'app-server-side-search-selection-dialog-demo',
    template: `
    selected product id: {{product?.id}}
    <br>
    Selected Product Name: {{product?.name}}
    <br>
    <button mat-raised-button (click)="showSelectionDialog()">Select Product</button>
  `,
    styles: []
})
export class ServerSideSearchSelectionDialogDemoComponent {
    constructor(private remult: Remult) { }
    product?: Product;
    async showSelectionDialog() {
        await openDialog(ServerSideSearchSelectionDialogComponent,
            dialog => dialog.args = {
                onSelect: selectedProduct => {
                    this.product = selectedProduct
                }
            });
    }
}
