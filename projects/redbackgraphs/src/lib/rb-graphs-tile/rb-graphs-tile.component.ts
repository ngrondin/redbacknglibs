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

  get value(): number {
    return Math.max(this.dataitem.value - this.counter, 0);
  }

  get label(): string {
    return this.dataitem.label;
  }

}
