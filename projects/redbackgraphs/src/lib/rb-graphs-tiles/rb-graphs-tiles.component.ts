import { EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

import { DataItem, EnhancedData } from '../datamodel';


@Component({
  selector: 'rb-graphs-tiles',
  templateUrl: './rb-graphs-tiles.component.html',
  styleUrls: ['./rb-graphs-tiles.component.css']
})
export class RbGraphsTilesComponent implements OnInit, OnChanges {
  @Input('data') data: DataItem[] = [];
  @Input('cols') cols: number = 3;
  @Input('rows') rows: number = 3;
  @Input('palette') palette: string[] = ['orange', 'red', 'blue', 'green'];
  @Input('colormap') colormap: {[key: string]: string} | undefined;
  @Input('valuecolorrange') valuecolorrange: {from: number, to:number, color:string, oncolor:string}[] | undefined;
  @Input('format') format: string | undefined = undefined;
  @Input('fullcolor') fullcolor: boolean = false;
  @Output('selectitem') selectitem = new EventEmitter<any>();

  enhancedData: EnhancedData[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.enhancedData = [];
    if(this.data != null) {
      for(let i = 0; i < this.data.length && i < (this.rows * this.cols); i++) {
        let value: number = this.data[i].value;
        let color = null;
        let onColor = undefined;
        if(this.valuecolorrange != null) { 
          let range = this.valuecolorrange.find((rng) => rng.from <= value && rng.to >= value);
          if(range != null) {
            color = range.color;
            onColor = range.oncolor;
          }
        }
        if(color == null && this.colormap != null && this.data[i].code != null) {
          color = this.colormap[this.data[i].code!];
        }
        if(color == null) {
          color = this.palette[i % this.palette.length]
        }
        this.enhancedData.push(new EnhancedData(this.data[i].code, this.data[i].label, value, color, onColor, this.format));
      }
    } 
  }


  public get tileWidth() : number {
    return (100 / this.cols);
  }

  public get tileHeight() : number {
    return (100 / this.rows);
  }

  clickItem(code: string | undefined) {
    if(code != null) {
      this.selectitem.emit({code: code});
    }
  }

}
