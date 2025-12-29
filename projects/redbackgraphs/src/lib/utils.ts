export class Formatter {

    static format(value: number, format: string | undefined, param?: any) : string {
        if(format == 'decimal') {
            return this.formatDecimal(value, param);
        } else if(format == 'currency') {
            return this.formatCurrency(value);
        } else if(format == 'percent') {
            return this.formatPercent(value);     
        } else if(format == 'duration') {
            return this.formatDuration(value);
        } else if(format == 'hours') {
            return this.formatHours(value);            
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

   static formatDuration(value: number) : string {
        if(value != null && !isNaN(value)) {
            let ms = value;
            let years = Math.floor(ms / 31536000000);
            let weeks = Math.floor((ms % 31536000000) / 604800000);
            let days = Math.floor((ms % 604800000) / 86400000);
            let hours = Math.floor((ms % 86400000) / 3600000);
            let minutes = Math.floor((ms % 3600000) / 60000);
            let seconds = Math.floor((ms % 60000) / 1000);
            let milli = Math.floor((ms % 1000));
            let greaterThanMinute = ms > 60000;
            let greaterThanHour = ms > 3600000;
            let val = "";
            if(years != 0)
              val = val + " " + years + "y";
            if(weeks != 0)
              val = val + " " + weeks + "w";
            if(days != 0)
              val = val + " " + days + "d";
            if(hours != 0)
              val = val + " " + hours + "h";
            if(minutes != 0)
              val = val + " " + minutes + "m";
            if(seconds != 0 && !greaterThanHour)
              val = val + " " + seconds + "s";
            if(milli != 0 && !greaterThanMinute)
              val = val + " " + milli + "ms";
            if(ms == 0) 
              val = " 0";
            return val.substring(1);
        } else {
            return "";
        }
    }

   static formatHours(value: number) : string {
        if(value != null && !isNaN(value)) {
            let ms = value;
            let hrs = Math.round(ms/36000) / 100;
            return hrs.toString();
        } else {
            return "";
        }
    }    
}