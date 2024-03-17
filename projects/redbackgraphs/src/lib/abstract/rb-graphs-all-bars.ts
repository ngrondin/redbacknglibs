import { Component, Directive, Input, OnInit } from "@angular/core";
import { RbGraphsAll } from "./rb-graphs-all";
import { DispayLegendItem, DisplayCat, DisplayData, DisplayGridLine } from "../datamodel";
import { Formatter } from "../utils";

@Component({template: ''})
export abstract class RbGraphsAllBars extends RbGraphsAll {
    @Input('valuelabel') valuelabel: string | undefined = undefined;
    @Input('catlabel') catlabel: string | undefined = undefined;
    @Input('serieslabel') serieslabel: string | undefined = undefined;
    @Input('stacked') stacked: boolean = false;
    @Input('legendposition') legendposition: string = 'right';
  
    lines: DisplayGridLine[] = []
    legend: DispayLegendItem[] = [];
    topValue: number = 0;
    
    constructor() {
        super();
    }

    get catOrSeriesLabels() {
      if(this.displayCats.length == 1 && this.stacked == false) {
        return this.displayCats[0].series.map(i => i.label);
      } else {
        return this.displayCats.map(ed => ed.label);
      }
    }
  
    get catOrSeriesLabel() {
      if(this.displayCats.length == 1) {
        return this.serieslabel;
      } else {
        return this.catlabel;
      }
    }

    get barLegendPosition() {
        if(this.displayCats.length == 1 && this.stacked == false) {
          return 'none';
        } else {
          return this.legendposition;
        }
    }

    getStackBalanceFlex(cat: DisplayCat) {
      return Math.floor((this.topValue - cat.series.reduce((acc, val) => acc + val.value, 0)) * 100);
    }
  
    getBarBalanceFlex(item: DisplayData) {
      return Math.floor((this.topValue - item.value) * 100);
    }
  
    getTargetFlex(item: DisplayData) {
      return Math.floor((item.target || 0) * 100 * this.getAnimatePercent());
    }
  
    getTargetBalanceFlex(item: DisplayData) {
      return Math.floor((this.topValue - (item.target || 0)) * 100);
    }    

    calc() {
      this.calcLegend();
      this.calcBars();
      this.calcLines();
    }

    calcLegend() {
      this.legend = [];
      for(let cat of this.cats) {
        for(let item of cat.series) {
          let code = item.code ?? "";
          let color = "transparent";
          let legendItem = this.legend.find(l => l.code == code);
          if(legendItem == null) {
            if(this.colormap != null) {
              color = this.colormap[code];
            } else {
              color = this.palette[Object.keys(this.legend).length % this.palette.length];
            }
            this.legend.push(new DispayLegendItem(code, item.label, color)); 
          }
        }  
      }
    }

    calcBars() {
      this.displayCats = [];
      let max = 0;
      let altcolors = this.stacked ? ["transparent"] : ["transparent", "#ccc5"];
      for(let cat of this.cats) {
        const displayCat = new DisplayCat(cat.code, cat.label);
        displayCat.color = altcolors[this.displayCats.length % 2];
        let catValSum = 0;
        for(let le of this.legend) {
          let items = cat.series.filter(i => i.code == le.code);
          let value = 0;
          let target = null;
          for(let item of items) {
            value += item.value;
            if(item.target != null) {
              if(target == null) target = 0;
              target += item.target;
            }
          }
          const displayItem = new DisplayData(le.code, le.label, value, le.color, undefined);
          if(target != null) displayItem.target = target;
          displayCat.series.push(displayItem);
          catValSum += value;
          if(!this.stacked && value > max) max = value;
          if(!this.stacked && target != null && target > max) max = target;          
        }
        if(this.stacked && catValSum > max) max = catValSum;
        this.displayCats.push(displayCat);
      }
      this.topValue = max * 1.1;
      this.calcLines();
    }

    calcLines() {
        this.lines = [];
        let max = this.topValue;
        let log = Math.log10(max);
        let logf = Math.floor(log);
        let lineDelta = Math.pow(10, logf);
        if(max / lineDelta < 3) {
          lineDelta = lineDelta / 2
        }
        let dec = Math.max(0, (-1 * Math.floor(Math.log(lineDelta))));
        let lineCount = Math.floor(max / lineDelta);
        let lineLabel = Formatter.format(lineCount * lineDelta, this.format || 'decimal', dec);
        let balance = max - (lineCount * lineDelta);
        let flex = Math.floor(balance * 100);
        this.lines.push(new DisplayGridLine(lineLabel, flex));
        for(let i = lineCount - 1; i >= 0; i--) {
          let lastLineLabel = Formatter.format(i * lineDelta, this.format || 'decimal', dec);
          this.lines.push(new DisplayGridLine(lastLineLabel, Math.floor(lineDelta * 100)));
        }
    }
}
