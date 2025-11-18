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
    uniqueCodes: CodeLabelColor[] = [];
    legend: DispayLegendItem[] = [];
    legendLabel: string | undefined = undefined;
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
        /*if(this.displayCats.length == 1 && this.stacked == false) {
        //if(this.legend.length > 0) {
          return 'none';
        } else {
          return this.legendposition;
        }*/
       return this.legendposition
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
      this.calcUniqueCodes();
      this.calcBars();
      this.calcLegend();
      this.calcLines();
    }

    calcUniqueCodes() {
      this.uniqueCodes = [];
      for(let cat of this.cats) {
        for(let item of cat.series) {
          let code = item.code ?? "";
          let color = "transparent";
          let unique = this.uniqueCodes.find(l => l.code == code);
          if(unique == null) {
            if(this.singlecolor != null) {
              color = this.singlecolor;
            } else if(this.colormap != null) {
              color = this.colormap[code];
            } else {
              color = this.palette[Object.keys(this.uniqueCodes).length % this.palette.length];
            }
            this.uniqueCodes.push(new CodeLabelColor(code, item.label, color)); 
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
        displayCat.color = cat.color != null ? cat.color : altcolors[this.displayCats.length % 2];
        let catValSum = 0;
        for(let clc of this.uniqueCodes) {
          let items = cat.series.filter(i => i.code == clc.code);
          let value = 0;
          let target = null;
          for(let item of items) {
            value += item.value;
            if(item.target != null) {
              if(target == null) target = 0;
              target += item.target;
            }
          }
          const displayItem = new DisplayData(clc.code, clc.label, value, clc.color, undefined);
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

    calcLegend() {
      this.legend = [];
      if(this.displayCats.length > 1 || this.stacked == true) {
        this.legendLabel = this.serieslabel;
        this.legend = this.uniqueCodes.map(clc => new DispayLegendItem(clc.label, clc.color, LegendShape.Square));
      } else if(this.valuetargetlegend != null) {
        this.legendLabel = undefined;
        let valueColor = this.singlecolor != null ? this.singlecolor : (this.colormap != null ? this.colormap[Object.keys(this.colormap)[0]] : this.palette[0]);
        this.legend = [
          new DispayLegendItem(this.valuetargetlegend.value, valueColor, LegendShape.Square),
          new DispayLegendItem(this.valuetargetlegend.target, "#880000", LegendShape.Line)
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
}
