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
  @Input('colormap') colormap: any;
  @Input('format') format: string | undefined = undefined;
  @Output('selectitem') selectitem = new EventEmitter<DataItem>();

  enhancedData: EnhancedData[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.enhancedData = [];
    if(this.data != null) {
      for(let i = 0; i < this.data.length && i < (this.rows * this.cols); i++) {
        let color = this.palette[i % this.palette.length];
        if(this.colormap != null && this.data[i].code != null) {
          color = this.colormap[this.data[i].code!];
        }
        this.enhancedData.push(new EnhancedData(this.data[i], color, this.format));
      }
    } 
  }


  public get tileWidth() : number {
    return (100 / this.cols);
  }

  public get tileHeight() : number {
    return (100 / this.rows);
  }

  clickItem(dataitem: DataItem) {
    this.selectitem.emit(dataitem);
  }

}
