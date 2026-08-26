import { Component, Input } from '@angular/core';
import { RbGraphsAllBars } from '../abstract/rb-graphs-all-bars';
import { DisplayCat, DisplayData } from '../datamodel';
import { Formatter } from '../utils';

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

  /* Hover labels for the average and target reference bars:
     - names come from the valuetargetlegend input when set, with plain fallbacks
     - values use the same Formatter as the bar segment labels */
  get altValueLabel() : string {
    return (this.valuetargetlegend != null && this.valuetargetlegend.altvalue != null)
      ? this.valuetargetlegend.altvalue : 'Average';
  }

  get targetLabel() : string {
    return (this.valuetargetlegend != null && this.valuetargetlegend.target != null)
      ? this.valuetargetlegend.target : 'Target';
  }

  refValueStr(value: number | undefined) : string {
    return value != null ? Formatter.format(value, this.format) : '';
  }

}
