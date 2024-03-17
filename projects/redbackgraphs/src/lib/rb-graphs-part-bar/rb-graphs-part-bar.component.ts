import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Formatter } from '../utils';

@Component({
  selector: 'rb-graphs-part-bar',
  templateUrl: './rb-graphs-part-bar.component.html',
  styleUrls: ['./rb-graphs-part-bar.component.css']
})
export class RbGraphsPartBarComponent implements OnInit {
  @Input('color') color: string = "red";
  @Input('label') label: string = "";
  @Input('value') value: number = 0;
  @Input('format') format: string | undefined;
  @Input('animatestep') animateStep: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  get valueStr() {
    return Formatter.format(this.value, this.format);
  }

  @HostBinding('style.background')
  get hostColor() {
    return this.color;
  }

  @HostBinding('style.flex-grow')
  get hostFlexGrow() {
    let percent = this.animateStep * this.animateStep * (3.0 - (2.0 * this.animateStep))
    return Math.floor(this.value * 100 * percent);
  }
}
