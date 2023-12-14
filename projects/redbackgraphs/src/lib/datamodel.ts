export class DataItem {
    code?: string | undefined;
    label: string;
    value: number;

    constructor(c: string, l: string, v: number) {
        this.code = c;
        this.label = l;
        this.value = v;
    }
}

export class EnhancedData {
    dataitem: DataItem;
    color: string;
    format: string|undefined;
  
    constructor(i: DataItem, c: string, f: string|undefined) {
      this.dataitem = i;
      this.color = c;
      this.format = f;
    }
  }