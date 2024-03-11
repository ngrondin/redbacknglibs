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
  onColor: string | undefined;
  format: string|undefined;

  constructor(c: string | undefined, l:string, v: number, col: string, oncol: string | undefined, f: string|undefined) {
    this.code = c;
    this.label = l;
    this.value = v;
    this.valuefordisplay = v;
    this.color = col;
    this.onColor = oncol;
    this.format = f;
  }
}

export class EnhancedCat {
  code: string | undefined;
  label: string;
  series: EnhancedData[];

  constructor(c: string | undefined, l: string) {
    this.code = c;
    this.label = l;
    this.series = [];
  }
}
