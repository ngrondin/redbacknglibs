import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { DispayLegendItem } from '../datamodel';

@Component({
  selector: 'rb-graphs-legend',
  templateUrl: './rb-graphs-legend.component.html',
  styleUrls: ['./rb-graphs-legend.component.css']
})
export class RbGraphsLegendComponent implements OnInit {
  @Input('items') items: DispayLegendItem[] = [];
  @Input('label') label?: string;
  @Input('row') row: boolean = false;

  @Output('select') select = new EventEmitter<string | null>();

  selected: string | null = null;
  
  constructor() { }

  ngOnInit(): void {

  }
  
  click(item: DispayLegendItem) {
    if(item.code != null) {
      this.selected = (this.selected != item.code ? item.code : null);
      this.select.emit(this.selected);
    }
  }
}
