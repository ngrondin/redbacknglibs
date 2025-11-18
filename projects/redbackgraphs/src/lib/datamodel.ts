import { Data } from "@angular/router";

export class DataItem {
  code: string | undefined;
  label: string;
  value: number;
  target: number | undefined;

  constructor(c: string, l: string, v: number, t: number) {
      this.code = c;
      this.label = l;
      this.value = v;
      this.target = t;
  }
}

export class CatItem {
  code: string | undefined;
  label: string;
  series: DataItem[];
  color: string | undefined;

  constructor(c: string | undefined, l: string, s: DataItem[], clr?: string | undefined) {
    this.code = c;
    this.label = l;
    this.series = s;
    this.color = clr;
  }
}

export class DisplayData {
  code: string | undefined;
  label: string;
  value: number;
  target: number | undefined;
  color: string;
  onColor: string | undefined;
  format: string|undefined;

  constructor(c: string | undefined, l:string, v: number, col: string, oncol: string | undefined) {
    this.code = c;
    this.label = l;
    this.value = v;
    this.color = col;
    this.onColor = oncol;
  }
}

export class DisplayCat {
  code: string | undefined;
  label: string;
  series: DisplayData[];
  color: string | undefined;

  constructor(c: string | undefined, l: string) {
    this.code = c;
    this.label = l;
    this.series = [];
  }
}

export class CodeLabelColor {
  code: string | undefined;
  label: string;
  color: string;

  constructor(c: string|undefined, l:string, col: string) {
    this.code = c;
    this.label = l;
    this.color = col;
  }
}

export enum LegendShape {
  Square,
  Line
}

export class DispayLegendItem {
  label: string;
  color: string;
  shape: LegendShape

  constructor(l:string, col: string, s: LegendShape) {
    this.label = l;
    this.color = col;
    this.shape = s;
  }
}

export class DisplayGridLine {
  label: string;
  flex: number;

  constructor(l: string, f: number) {
    this.label = l;
    this.flex = f;
  }
}
