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