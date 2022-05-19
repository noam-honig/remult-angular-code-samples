import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-page-layout',
  templateUrl: './full-page-layout.component.html',
  styleUrls: ['./full-page-layout.component.scss']
})
export class FullPageLayoutComponent implements OnInit {

  constructor() { }
  listOfItems: number[] = [];
  ngOnInit() {
    for (let index = 0; index < 100; index++) {
      this.listOfItems.push(index);

    }
  }

}
