import { Component, Input, OnInit } from '@angular/core';
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
  
  constructor() { }

  ngOnInit(): void {

  }

}
