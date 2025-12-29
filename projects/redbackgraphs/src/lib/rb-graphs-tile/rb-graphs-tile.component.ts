import { Component, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { DataItem } from '../datamodel';
import { Formatter } from '../utils';

@Component({
  selector: 'rb-graphs-tile',
  templateUrl: './rb-graphs-tile.component.html',
  styleUrls: ['./rb-graphs-tile.component.css']
})
export class RbGraphsTileComponent implements OnInit {
  @Input('label') _label: string = "";
  @Input('value') _value: number = 0;
  @Input('color') _color: string = 'orange';
  @Input('onColor') _onColor: string | undefined;
  @Input('fullcolor') fullcolor: boolean = false;
  @Input('format') format: string | undefined = undefined;
  @Input('fontsize') fontSize: number = 1;

  _defaultBackColor = "#042438";

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
    '.': 25,
    ',':25,
    '$':50
  }

  counter: number = 3;
  canvas: any;

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
    let str = this.valuestr;
    let len = 30;
    for(var c of str) {
      len += this.widthMap[c];
    }
    return "0 0 " + len + " 100";
  }

  get value(): number {
    return Math.max(this._value - this.counter, 0);
  }

  get valuestr(): string {
    return Formatter.format(this.value, this.format);
  }
 
  get label(): string {
    return this._label;
  }

  get width(): number {
    let str = this.value.toString();
    let w = 0;
    for(let i = 0; i < str.length; i++) {
      if(str.charAt(i) == '.') w += 3.1;
      else if(str.charAt(i) == ' ') w += 8.0;
      else w += 7.2;
    }
    return w;
  }

  get color() {
    return this._color;
  }

  get backColor() {
    return this.fullcolor ? this.color : this._defaultBackColor;
  }

  get fontColor() {
    return this._onColor || '#bbb';
  }

}
