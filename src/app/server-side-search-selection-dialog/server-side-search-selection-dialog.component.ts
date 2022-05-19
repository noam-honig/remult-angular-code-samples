import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BusyService } from '@remult/angular';
import { Remult } from 'remult';
import { Product } from '../products/product';

@Component({
  selector: 'app-server-side-search-selection-dialog',
  template: `
<h1 mat-dialog-title>Select Product</h1>

<div mat-dialog-content>
    <form (submit)="selectFirst()">
        <mat-form-field>
            <input matInput [(ngModel)]="searchString" [ngModelOptions]="{standalone: true}" placeholder="Search" (input)="doSearch()"> 
        </mat-form-field>
    </form>
    <mat-nav-list role="list" *ngIf="products">
        <ng-container *ngFor="let o of products">
            <mat-list-item role="listitem" style="height:36px"
                 (click)="select(o)">
                {{o.name}}
            </mat-list-item>
            <mat-divider ></mat-divider>
        </ng-container>
    </mat-nav-list>
</div>
<div mat-dialog-actions>

    <button mat-icon-button mat-dialog-close>
        <mat-icon>clear</mat-icon>
    </button>
</div>  `,
  styles: []
})
export class ServerSideSearchSelectionDialogComponent implements OnInit {

  constructor(private remult: Remult, private busy: BusyService, private dialogRef: MatDialogRef<any>) { }
  products: Product[] = [];
  ngOnInit() {
    this.loadProducts();
  }
  async loadProducts() {
    this.products = await this.remult.repo(Product).find({
      where: {
        name: { $contains: this.searchString }
      }
    });
  }
  async doSearch() {
    await this.busy.donotWait(async () => this.loadProducts());
  }

  searchString='';


  args!: {
    onSelect: (p: Product) => void;
  }
  select(p: Product) {
    this.args.onSelect(p);
    this.dialogRef.close();
  }
  selectFirst() {
    if (this.products.length > 0)
      this.select(this.products[0]);
  }

}
