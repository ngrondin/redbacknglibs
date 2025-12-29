import { Component, Directive, Input, OnInit } from "@angular/core";
import { RbGraphsAll } from "./rb-graphs-all";
import { CodeLabelColor, DispayLegendItem, DisplayCat, DisplayData, DisplayGridLine, LegendShape } from "../datamodel";
import { Formatter } from "../utils";

@Component({template: ''})
export abstract class RbGraphsAllBars extends RbGraphsAll {
    @Input('valuelabel') valuelabel: string | undefined = undefined;
    @Input('catlabel') catlabel: string | undefined = undefined;
    @Input('serieslabel') serieslabel: string | undefined = undefined;
    @Input('stacked') stacked: boolean = false;
    @Input('legendposition') legendposition: string = 'right';
    @Input('valuetargetlegend') valuetargetlegend: any;
  
    lines: DisplayGridLine[] = []
    legend: DispayLegendItem[] = [];
    legendLabel: string | undefined = undefined;
    topValue: number = 0;
    filter: string | null = null;
    
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
       return this.legendposition
    }

    getFlex(val: number | undefined) : number {
      return Math.floor((val || 0) * 100);
    }

    getAnimatedFlex(val: number | undefined) : number {
      return Math.floor((val || 0) * 100 * this.animatePercent);
    }

    getBalanceFlex(val: number | undefined) : number {
      return Math.floor((this.topValue - (val || 0)) * 100);
    }

    getStackBalanceFlex(cat: DisplayCat) {
      return Math.floor((this.topValue - cat.series.reduce((acc, val) => acc + val.value, 0)) * 100);
    }
  
    calc() {
      this.calcData();
      this.calcLegend();
      this.calcLines();
    }

    calcData() {
      this.displayCats = [];
      let max = 0;
      let altcolors = this.stacked ? ["transparent"] : ["transparent", "#ccc5"];
      for(let i = 0; i < this.cats.length; i++) { 
        let cat = this.cats[i];
        const displayCat = new DisplayCat(cat.code, cat.label);
        displayCat.color = cat.color != null ? cat.color : altcolors[this.displayCats.length % 2];
        if(cat.altvalue != null) {
          displayCat.altvalue = cat.altvalue;
          if(cat.altvalue > max) max = cat.altvalue;
        }
        if(cat.target != null) {
          displayCat.target = cat.target;
          if(cat.target > max) max = cat.target;
        }
        let catValSum = 0;
        for(var j = 0; j < this.uniqueCodes.length; j++) {
          let clc = this.uniqueCodes[j];
          if(this.filter == null || (this.filter != null && this.filter == clc.code)) {
            let items = cat.series.filter(i => i.code == clc.code);
            let value = 0;
            let altvalue = null;
            let target = null;
            for(let item of items) {
              value += item.value;
              if(item.altvalue != null) {
                if(altvalue == null) altvalue = 0;
                altvalue += item.altvalue;
              }
              if(item.target != null) {
                if(target == null) target = 0;
                target += item.target;
              }
            }
            const displayItem = new DisplayData(clc.code, clc.label, value, clc.color, undefined);
            if(altvalue != null) displayItem.altvalue = altvalue;
            if(target != null) displayItem.target = target;
            displayCat.series.push(displayItem);
            catValSum += value;
            if(!this.stacked && value > max) max = value;
            if(!this.stacked && altvalue != null && altvalue > max) max = altvalue;   
            if(!this.stacked && target != null && target > max) max = target;  
          }       
        }
        if(this.stacked && catValSum > max) max = catValSum;
        this.displayCats.push(displayCat);
      }
      this.topValue = max * 1.1;
    }

    calcLegend() {
      this.legend = [];
      if(this.displayCats.length > 1 || this.stacked == true) {
        this.legendLabel = this.serieslabel;
        this.legend = this.uniqueCodes.map(clc => new DispayLegendItem(clc.code, clc.label, clc.color, LegendShape.Square));
      } else if(this.valuetargetlegend != null) {
        this.legendLabel = undefined;
        let valueColor = this.singlecolor != null ? this.singlecolor : (this.colormap != null ? this.colormap[Object.keys(this.colormap)[0]] : this.palette[0]);
        this.legend = [
          new DispayLegendItem(undefined, this.valuetargetlegend.value, valueColor, LegendShape.Square),
          new DispayLegendItem(undefined, this.valuetargetlegend.target, "#880000", LegendShape.Line)
        ]
      }
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

    setFilter(code: string | null) {
      console.log('add bars: ' + code);
      this.filter = code;
      this.calc();
    }
}
