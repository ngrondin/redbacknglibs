import { Data } from "@angular/router";

export class DataItem {
  code: string | undefined;
  label: string;
  value: number;

  constructor(c: string, l: string, v: number) {
      this.code = c;
      this.label = l;
      this.value = v;
  }
}

export class CatItem {
  code: string | undefined;
  label: string;
  series: DataItem[];

  constructor(c: string | undefined, l: string, s: DataItem[]) {
    this.code = c;
    this.label = l;;
    this.series = s;
  }
}

export class EnhancedData {
  code: string | undefined;
  label: string;
  value: number;
  valuefordisplay: number;
  color: string;
  format: string|undefined;
  //dataitem: DataItem | undefined;

  constructor(c: string | undefined, l:string, v: number, col: string, f: string|undefined/*, di: DataItem | undefined*/) {
    this.code = c;
    this.label = l;
    this.value = v;
    this.valuefordisplay = v;
    this.color = col;
    this.format = f;
    //this.dataitem = di;
  }
}

export class EnhancedCat {
  code: string | undefined;
  label: string;
  series: EnhancedData[];
  //catitem: CatItem | undefined;

  constructor(c: string | undefined, l: string/*, ci: CatItem | undefined*/) {
    this.code = c;
    this.label = l;
    this.series = [];
    //this.catitem = ci;
  }
}
