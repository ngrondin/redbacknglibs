import { NgModule } from '@angular/core';
import { RedbackgraphsComponent } from './redbackgraphs.component';
import { RbGraphsTileComponent } from './rb-graphs-tile/rb-graphs-tile.component';
import { RbGraphsTilesComponent } from './rb-graphs-tiles/rb-graphs-tiles.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    RedbackgraphsComponent,
    RbGraphsTileComponent,
    RbGraphsTilesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RedbackgraphsComponent,
    RbGraphsTilesComponent,
    RbGraphsTileComponent
  ]
})
export class RedbackgraphsModule { }
