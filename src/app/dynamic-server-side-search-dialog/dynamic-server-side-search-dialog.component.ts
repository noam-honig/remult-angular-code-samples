import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BusyService } from '@remult/angular';
import { EntityFilter, FieldMetadata, FieldsMetadata, Filter, Remult, Repository } from 'remult';

@Component({
    selector: 'app-dynamic-server-side-search-dialog',
    template: `
<h1 mat-dialog-title>Select {{title}}</h1>
<div mat-dialog-content>
    <form (submit)="selectFirst()">
    <mat-form-field>
      <input matInput [(ngModel)]="searchString" name="search" placeholder="search" (input)="doSearch()"> 
    </mat-form-field>
    </form>
    <mat-nav-list role="list" *ngIf="items">
        <ng-container *ngFor="let o of items">
            <mat-list-item role="listitem" style="height:36px"
                 (click)="select(o)">
                {{getDislayString(o)}}
            </mat-list-item>
            <mat-divider ></mat-divider>
        </ng-container>
    </mat-nav-list>
</div>
<div mat-dialog-actions>
    <button mat-icon-button mat-dialog-close>
        <mat-icon>clear</mat-icon>
    </button>
</div>    `,
    styles: []
})
export class DynamicServerSideSearchDialogComponent implements OnInit {


    constructor(private remult: Remult, private busy: BusyService, private dialogRef: MatDialogRef<any>) { }
    items: any[] = [];
    ngOnInit() {
        this.loadProducts();
    }
    getDislayString(item: any) {
        return this.repository.getEntityRef(item).fields.find(this._args.searchColumn(this.repository.metadata.fields)).displayValue;
    }
    async loadProducts() {
        this.items = await this.repository.find({
            where: {
                $and: [this._args.where!, {
                    [this._args.searchColumn(this.repository.metadata.fields).key]: this.searchString ? { $contains: this.searchString } : undefined
                }]
            }


        });
    }

    searchString = '';

    repository!: Repository<any>;
    _args!: dynamicSearchDialog<any>;
    title!: string;

    args<entity>(entityType: {
        new(...args: any[]): entity
    }, args: dynamicSearchDialog<entity>) {
        this._args = args;
        this.repository = this.remult.repo(entityType);
        this.title = this.repository.metadata.caption;

    }
    select(p: any) {
        this._args.onSelect(p);
        this.dialogRef.close();
    }
    selectFirst() {
        if (this.items.length > 0)
            this.select(this.items[0]);
    }
    async doSearch() {
        await this.busy.donotWait(async () => this.loadProducts());
    }

}
export interface dynamicSearchDialog<T> {
    onSelect: (item: T) => void;
    searchColumn: (item: FieldsMetadata<T>) => FieldMetadata;
    where?: EntityFilter<T>;

}