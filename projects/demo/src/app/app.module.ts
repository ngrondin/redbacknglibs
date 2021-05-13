import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedbackgraphsModule } from 'projects/redbackgraphs/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RedbackgraphsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
