import { EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

import { DataItem, DisplayCat, DisplayData } from '../datamodel';
import { RbGraphsAll } from '../abstract/rb-graphs-all';
import { Formatter } from '../utils';


@Component({
  selector: 'rb-graphs-tiles',
  templateUrl: './rb-graphs-tiles.component.html',
  styleUrls: ['./rb-graphs-tiles.component.css']
})
export class RbGraphsTilesComponent extends RbGraphsAll {
  @Input('cols') cols: number = 3;
  @Input('rows') rows: number = 3;
  @Input('valuecolorrange') valuecolorrange: {from: number, to:number, color:string, oncolor:string}[] | undefined;
  @Input('fullcolor') fullcolor: boolean = false;

  valueFontSize: number = 3;

  constructor() {
    super();
  }

  public get tileWidth() : number {
    return (100 / this.cols);
  }

  public get tileHeight() : number {
    return (100 / this.rows);
  }

  public get displaySeries() {
    return this.displayCats.length > 0 ? this.displayCats[0].series : [];
  }

  calc() {
    let maxValueWidth = 0;
    this.displayCats = [];
    if(this.cats.length > 0) {
      let cat = this.cats[0];
      let displayCat = new DisplayCat(cat.code, cat.label);
      for(let i = 0; i < cat.series.length && i < (this.rows * this.cols); i++) {
        let item = cat.series[i];
        let value: number = item.value;
        let color = null;
        let onColor = undefined;
        if(this.valuecolorrange != null) { 
          let range = this.valuecolorrange.find((rng) => rng.from <= value && rng.to >= value);
          if(range != null) {
            color = range.color;
            onColor = range.oncolor;
          }
        }
        if(color == null && this.colormap != null && item.code != null) {
          color = this.colormap[item.code!];
        }
        if(color == null) {
          color = this.palette[i % this.palette.length]
        }
        let valueWidth = this.estimateTextWidth(Formatter.format(value, this.format));
        maxValueWidth = Math.max(maxValueWidth, valueWidth);
        displayCat.series.push(new DisplayData(item.code, item.label, value, color, onColor));
      }
      this.displayCats.push(displayCat);
    }
    console.log(maxValueWidth);
    this.valueFontSize = Math.min(4, 80/maxValueWidth); 
  }
      
  estimateTextWidth(str: string): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const metrics = context!.measureText(str);
    return metrics.width;
  }
}
