import { Component, Input } from '@angular/core';
import { RbGraphsAllBars } from '../abstract/rb-graphs-all-bars';
import { DisplayCat, DisplayData } from '../datamodel';

@Component({
  selector: 'rb-graphs-vbar',
  templateUrl: './rb-graphs-vbar.component.html',
  styleUrls: ['./rb-graphs-vbar.component.css']
})
export class RbGraphsVBarComponent extends RbGraphsAllBars {
  @Input('verticalxlabels') _verticalxlabel: boolean | undefined;
  
  constructor() {
    super();
  }

  get verticalxlabel() : boolean {
    if(this._verticalxlabel != null) {
      return this._verticalxlabel;
    } else {
      if(this.catOrSeriesLabels.length > 8) {
        return true; 
      } else {
        return false;
      }
    }
  }

}
