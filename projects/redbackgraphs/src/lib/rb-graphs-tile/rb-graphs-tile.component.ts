import { Component, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { DataItem } from '../datamodel';

@Component({
  selector: 'rb-graphs-tile',
  templateUrl: './rb-graphs-tile.component.html',
  styleUrls: ['./rb-graphs-tile.component.css']
})
export class RbGraphsTileComponent implements OnInit {
  @Input('dataitem') dataitem: DataItem = new DataItem("", "", 0);
  @Input('color') color: string = 'orange';

  widthMap: any = {
    '0': 50,
    '1': 44,
    '2': 50,
    '3': 50,
    '4': 50,
    '5': 50,
    '6': 50,
    '7': 50,
    '8': 50,
    '9': 50,
    '.': 25
  }

  counter: number = 3;

  constructor() { }

  ngOnInit(): void {
    this.updateCounter();
  }

  updateCounter() {
    if(this.counter > 0) {
      this.counter--;
      setTimeout(() => this.updateCounter(), 300);
    }    
  }

  get viewbox() : string {
    let str = this.dataitem.value.toString();
    let len = 0;
    for(var c of str) {
      len += this.widthMap[c];
    }
    return "0 0 " + len + " 100";
  }

  get value(): number {
    return Math.max(this.dataitem.value - this.counter, 0);
  }

  get label(): string {
    return this.dataitem.label;
  }

}
