import { Component, Directive, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { CatItem, DataItem, DisplayCat } from "../datamodel";

@Component({template: ''})
export abstract class RbGraphsAll implements OnInit {
  @Input('palette') palette: string[] = ['orange', 'red', 'blue', 'green'];
  @Input('colormap') colormap: any;
  @Input('singlecolor') singlecolor: string | undefined = undefined;
  @Input('format') format: string | undefined = undefined;
  @Output('selectitem') selectitem = new EventEmitter<any>();
  @Input('data') set data(value: CatItem[] | DataItem[]) {
    if(value != null) {
      if(value.length > 0 && !value[0].hasOwnProperty('series')) {
        let rootCat = new CatItem("", "", (value as DataItem[]));
        this.cats = [rootCat];
      } else {
        this.cats = (value as CatItem[]);
      }        
    } else {
      this.cats = [];
    }
  }

  cats: CatItem[] = [];
  displayCats: DisplayCat[] = [];
  animateStep: number = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.animate(), 700);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calc();
  }

  getAnimatePercent(): number {
    return this.animateStep * this.animateStep * (3.0 - (2.0 * this.animateStep));
  }

  abstract calc(): any;

  clickItem(cat: string | null | undefined, code: string | undefined) {
    if(code != null) {
      this.selectitem.emit({cat: cat, code: code});
    }
  }

  animate() {
    if(this.animateStep < 0.99) {
      this.animateStep += 0.05;
      setTimeout(() => this.animate(), 50);
    }
  }

}