import { Component, OnInit } from '@angular/core';
import { BusyService } from '@remult/angular';
import { Remult } from 'remult';
import { Product } from '../products/product';

@Component({
    selector: 'app-server-side-search',
    template: `
<mat-form-field>
  <input matInput [(ngModel)]="searchString" name="search" placeholder="search" (input)="doSearch()"> 
</mat-form-field>
<ul>
    <li *ngFor="let p of products">
      {{p.name}}
    </li>
</ul>
`
})
export class ServerSideSearchComponent implements OnInit {

    constructor(private remult: Remult, private busy: BusyService) { }
    products: Product[] = [];
    ngOnInit() {
        this.loadProducts();
    }
    async loadProducts() {
        this.products = await this.remult.repo(Product).find({
            where: {
                name: this.searchString ? { $contains: this.searchString } : undefined
            }
        });
    }
    async doSearch() {
        await this.busy.donotWait(async () => this.loadProducts());
    }

    searchString = '';

}