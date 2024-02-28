import { NgModule } from '@angular/core';
import { RedbackgraphsComponent } from './redbackgraphs.component';
import { RbGraphsTileComponent } from './rb-graphs-tile/rb-graphs-tile.component';
import { RbGraphsTilesComponent } from './rb-graphs-tiles/rb-graphs-tiles.component';
import { CommonModule } from '@angular/common';
import { RbGraphsStackedComponent } from './rb-graphs-stacked/rb-graphs-stacked.component';



@NgModule({
  declarations: [
    RedbackgraphsComponent,
    RbGraphsTileComponent,
    RbGraphsTilesComponent,
    RbGraphsStackedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RedbackgraphsComponent,
    RbGraphsTilesComponent,
    RbGraphsTileComponent,
    RbGraphsStackedComponent
  ]
})
export class RedbackgraphsModule { }
