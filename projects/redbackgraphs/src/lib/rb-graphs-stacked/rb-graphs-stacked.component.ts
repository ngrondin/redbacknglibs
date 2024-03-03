import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CatItem, DataItem, EnhancedCat, EnhancedData } from '../datamodel';

@Component({
  selector: 'rb-graphs-stacked',
  templateUrl: './rb-graphs-stacked.component.html',
  styleUrls: ['./rb-graphs-stacked.component.css']
})
export class RbGraphsStackedComponent implements OnInit {
  @Input('data') data: CatItem[] = [];
  @Input('palette') palette: string[] = ['orange', 'red', 'blue', 'green'];
  @Input('colormap') colormap: any;
  @Input('format') format: string | undefined = undefined;
  @Input('ylabel') ylabel: string | undefined = undefined;
  @Input('xlabel') xlabel: string | undefined = undefined;
  @Input('legendlabel') legendlabel: string | undefined = undefined;
  @Output('selectitem') selectitem = new EventEmitter<any>();

  enhancedData: EnhancedCat[] = [];
  maxY: number = 0;
  lines: any[] = [];
  legend: any;
  animateStep: number = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.animate(), 700);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calc();
  }

  getAnimatePercent(): number {
    return this.animateStep * this.animateStep * (3.0 - (2.0 * this.animateStep));
  }

  getStackFlex(item: EnhancedData) {
    return Math.floor(item.value * 100 * this.getAnimatePercent());
  }

  getStackBalanceFlex(cat: EnhancedCat) {
    return Math.floor((this.maxY - cat.series.reduce((acc, val) => acc + val.value, 0)) * 100);
  }

  legendEntries(): any[] {
    return Object.keys(this.legend).map(k => ({label: this.legend[k].label, color: this.legend[k].color}));
  }

  calc() {
    this.enhancedData = [];
    this.lines = [];
    this.legend = {};
    this.maxY = 0;
    if(this.data != null) {
      for(let i = 0; i < this.data.length; i++) {
        let cat = this.data[i];
        let catSumY = 0;
        const enhancedCat = new EnhancedCat(cat.code, cat.label);
        this.enhancedData.push(enhancedCat);
        for(let j = 0; j < cat.series.length; j++) {
          let item = cat.series[j];
          let code = item.code ?? "";
          if(this.legend[code] == null) {
            this.legend[code] = {label: item.label};
            if(this.colormap != null) {
              this.legend[code].color = this.colormap[code]
            } else {
              this.legend[code].color = this.palette[Object.keys(this.legend).length % this.palette.length];
            }
          }
          const enhancedItem = new EnhancedData(item.code, item.label, item.value, this.legend[code].color, undefined);
          enhancedCat.series.push(enhancedItem);
          catSumY += item.value;
        }
        if(catSumY > this.maxY) this.maxY = catSumY;
      }
    }
    this.maxY = this.maxY * 1.1;
    let log = Math.log10(this.maxY);
    let logf = Math.floor(log);
    let lineDelta = Math.pow(10, logf);
    if(this.maxY / lineDelta < 3) {
      lineDelta = lineDelta / 2
    }
    let dec = Math.max(0, (-1 * Math.floor(Math.log(lineDelta))));

    let lineCount = Math.floor(this.maxY / lineDelta);
    let balance = this.maxY - (lineCount * lineDelta);
    this.lines.push({value: (lineCount * lineDelta).toFixed(dec), flex: Math.floor(balance * 100)});
    for(let i = lineCount - 1; i >= 0; i--) {
      this.lines.push({value: (i * lineDelta).toFixed(dec), flex: Math.floor(lineDelta * 100)});
    }
  }

  clickItem(cat: string | undefined, code: string | undefined) {
    if(code != null && cat != null) {
      this.selectitem.emit({cat: cat, code: code});
    }
  }

  animate() {
    if(this.animateStep < 0.99) {
      this.animateStep += 0.05;
      setTimeout(() => this.animate(), 50);
    }
  }


}
