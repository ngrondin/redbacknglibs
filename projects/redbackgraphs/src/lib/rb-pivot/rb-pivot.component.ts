import { Component } from '@angular/core';
import { DisplayCat, DisplayData } from '../datamodel';
import { RbGraphsAll } from '../abstract/rb-graphs-all';
import { Formatter } from '../utils';

@Component({
  selector: 'rb-pivot',
  templateUrl: './rb-pivot.component.html',
  styleUrls: ['./rb-pivot.component.css']
})
export class RbPivotComponent extends RbGraphsAll {
  sums: number[] = [];

  constructor() {
    super();
  }

  calc() {
    this.calcData();
  }

  calcData() {
    this.displayCats = [];
    this.sums = this.uniqueCodes.map(clc => 0);
    for(let i = 0; i < this.cats.length; i++) { 
      let cat = this.cats[i];
      const displayCat = new DisplayCat(cat.code, cat.label);
      if(cat.altvalue != null) displayCat.altvalue = cat.altvalue;
      if(cat.target != null) displayCat.target = cat.target;
      let catValSum = 0;
      for(var j = 0; j < this.uniqueCodes.length; j++) {
        let clc = this.uniqueCodes[j];
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
        this.sums[j] += value;
            
      }
      this.displayCats.push(displayCat);
    }
    this.sums = this.sums.map(s => Math.round(s * 10000) / 10000); //This is to avoid the javascript innacuracies in adding numbers.
  }

  formatValue(val: number) : string {
    return Formatter.format(val, this.format);
  }
}
