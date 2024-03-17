import { Component, Input, OnInit } from '@angular/core';
import { DispayLegendItem } from '../datamodel';

@Component({
  selector: 'rb-graphs-chartframe',
  templateUrl: './rb-graphs-chartframe.component.html',
  styleUrls: ['./rb-graphs-chartframe.component.css']
})
export class RbGraphsChartframeComponent implements OnInit {
  @Input('ylabel') ylabel: string | undefined = undefined;
  @Input('xlabel') xlabel: string | undefined = undefined;
  @Input('legendlabel') legendlabel: string | undefined = undefined;
  @Input('legendposition') legendposition: string = 'right';
  @Input('legend') legend: DispayLegendItem[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
