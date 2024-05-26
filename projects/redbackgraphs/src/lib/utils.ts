export class Formatter {

    static format(value: number, format: string | undefined, param?: any) : string {
        if(format == 'decimal') {
            return this.formatDecimal(value, param);
        } else if(format == 'currency') {
            return this.formatCurrency(value);
        } else if(format == 'percent') {
            return this.formatPercent(value);            
        } else {
            return value.toString();
        }
    }

    static formatDecimal(value: number, dec: number) {
        try {
            return value.toFixed(dec);
        } catch(err) {
            return "-";
        }
    }

    static formatCurrency(value: number): string {
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',});
        return formatter.format(value);
    }

    static formatPercent(value: number): string {
        return (Math.floor(value * 1000) / 1000).toString() + "%";
    }
}