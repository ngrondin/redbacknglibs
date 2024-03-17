import { Component, Input, OnInit } from '@angular/core';
import { DisplayCat, DisplayData } from '../datamodel';
import { RbGraphsAllBars } from '../abstract/rb-graphs-all-bars';
import { Formatter } from '../utils';

@Component({
  selector: 'rb-graphs-hbar',
  templateUrl: './rb-graphs-hbar.component.html',
  styleUrls: ['./rb-graphs-hbar.component.css']
})
export class RbGraphsHbarComponent extends RbGraphsAllBars {
  @Input('valueonbar') valueonbar: boolean = false;
  
  constructor() {
    super();
  }

  addValueOnBar(val: number) {
    return this.valueonbar && val > 0 && val >= (this.topValue / 20);
  }

  addValueAfterBar(val: number) {
    return this.valueonbar && val > 0 && val < (this.topValue / 20);
  }

  formatValueOnBar(val: number) {
    return Formatter.format(val, this.format);
  }

}
