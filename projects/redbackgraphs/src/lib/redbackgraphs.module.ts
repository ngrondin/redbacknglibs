import { NgModule } from '@angular/core';
import { RedbackgraphsComponent } from './redbackgraphs.component';
import { RbGraphsTileComponent } from './rb-graphs-tile/rb-graphs-tile.component';
import { RbGraphsTilesComponent } from './rb-graphs-tiles/rb-graphs-tiles.component';
import { CommonModule } from '@angular/common';
import { RbGraphsVBarComponent } from './rb-graphs-vbar/rb-graphs-vbar.component';
import { RbGraphsLegendComponent } from './rb-graphs-legend/rb-graphs-legend.component';
import { RbGraphsChartframeComponent } from './rb-graphs-chartframe/rb-graphs-chartframe.component';
import { RbGraphsHbarComponent } from './rb-graphs-hbar/rb-graphs-hbar.component';
import { RbGraphsPartBarComponent } from './rb-graphs-part-bar/rb-graphs-part-bar.component';


@NgModule({
  declarations: [
    RedbackgraphsComponent,
    RbGraphsTileComponent,
    RbGraphsTilesComponent,
    RbGraphsVBarComponent,
    RbGraphsLegendComponent,
    RbGraphsChartframeComponent,
    RbGraphsHbarComponent,
    RbGraphsPartBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RedbackgraphsComponent,
    RbGraphsTilesComponent,
    RbGraphsTileComponent,
    RbGraphsVBarComponent,
    RbGraphsHbarComponent,
    RbGraphsChartframeComponent
  ]
})
export class RedbackgraphsModule { }
