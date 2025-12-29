import { Component, Directive, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { CatItem, CodeLabelColor, DataItem, DisplayCat, TimeTrackItem } from "../datamodel";

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
        let series = this.checkTimeSeries(value, 'series') as DataItem[];
        let rootCat = new CatItem("", "", series);
        this.cats = [rootCat];
      } else {
        this.cats = this.checkTimeSeries(value, 'cats') as CatItem[];
      }  
      this.animatePercent = 0;
      this.animateStart = null;
      requestAnimationFrame((ts) => this.animate(ts));      
    } else {
      this.cats = [];
    }
  }

  cats: CatItem[] = [];
  displayCats: DisplayCat[] = [];

  isTimeSeries: boolean = false;
  timeTrack1: TimeTrackItem[] | undefined;
  timeTrack2: TimeTrackItem[] | undefined;

  animatePercent: number = 0;
  animateStart: number | null = null;

  uniqueCodes: CodeLabelColor[] = [];
  

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.calcUniqueCodes();
    this.calc();
  }

  calcUniqueCodes() {
    this.uniqueCodes = [];
    for(let cat of this.cats) {
      for(let item of cat.series) {
        let code = item.code ?? "";
        let color = "transparent";
        let unique = this.uniqueCodes.find(l => l.code == code);
        if(unique == null) {
          if(this.singlecolor != null) {
            color = this.singlecolor;
          } else if(this.colormap != null) {
            color = this.colormap[code];
          } else {
            color = this.palette[Object.keys(this.uniqueCodes).length % this.palette.length];
          }
          this.uniqueCodes.push(new CodeLabelColor(code, item.label, color)); 
        }
      }  
    }
  }

  abstract calc(): any;

  checkTimeSeries(arr: (DataItem | CatItem)[], type: string): (DataItem | CatItem)[] {
    if(arr.length == 0) return arr;
    let trialDates = arr.map(i => i.code != null ? new Date(i.code) : null);
    let isTimeSeries = trialDates.reduce((acc, date) => acc && (date != null ? !isNaN(date.getTime()) : false), true);
    if(!isTimeSeries) return arr;
    this.isTimeSeries = true
    let dates: Date[] = (trialDates as Date[]);
    dates.sort((a, b) => a.getTime() - b.getTime());
    let minTS = dates[0].getTime();
    let maxTS = dates[dates.length - 1].getTime();
    let intervals = [];
    for(let i = 1; i < dates.length; i++) intervals.push(dates[i].getTime() - dates[i-1].getTime());
    let timeInterval = intervals.filter(i => i != 0).reduce((acc, val) => Math.min(acc, val));
    maxTS = maxTS + timeInterval;
    if(timeInterval > 0) {
      for(let cur = minTS; cur < maxTS; cur += timeInterval) {
        let dt = dates.find(d => d.getTime() == cur);
        if(dt == null) {
          if(type == 'series') {
            arr.push({code: new Date(cur).toISOString(), label: new Date(cur).toISOString(), value: 0, altvalue: undefined, target: undefined});
          } else if(type == 'cats') {
            arr.push({code: new Date(cur).toISOString(), label: new Date(cur).toISOString(), series: [], color: undefined, altvalue: undefined, target: undefined});
          }
        }
      }
    }
    arr.sort((a, b) => a.code!.localeCompare(b.code!));
    let hour = 3600000;
    let day = 24*hour;
    let skip = Math.ceil(arr.length / 15);
    let skipInterval = skip * timeInterval;
    let hourMultiple = skipInterval % hour == 0;
    let lessThanDay = skipInterval < day;
    this.timeTrack1 = [];
    for(var cur = minTS; cur < maxTS; cur += skipInterval) {
      let dt = new Date(cur);
      let label = lessThanDay ? this.getDateString(dt, false, false, false, true, !hourMultiple) : this.getDateString(dt, false, true, true, false, false);
      let dur = Math.min(skipInterval, maxTS - cur);
      this.timeTrack1.push(new TimeTrackItem(label, dur, skip > 1));
    }
    if(lessThanDay) {
      let startMidnight = new Date(minTS);
      startMidnight.setHours(0);
      startMidnight.setMinutes(0);
      startMidnight.setSeconds(0);
      this.timeTrack2 = [];
      for(var cur = startMidnight.getTime(); cur < maxTS; cur += day) {
        let dt = new Date(cur);
        let label = this.getDateString(dt, false, true, true, false, false);
        let dur = cur < minTS ? ((cur + day)-minTS) : Math.min(day, maxTS - cur);
        this.timeTrack2.push(new TimeTrackItem(label, dur, skip > 1));
      }
    }
    return arr;
  }

  getDateString(dt: Date, yr: boolean, mth: boolean, day: boolean, hr: boolean, min: boolean) : string {
    let parts: string[] = []
    if(day) parts.push(dt.getDate().toString());
    if(mth) parts.push(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dt.getMonth()]);
    if(yr) parts.push(dt.getFullYear().toString());
    if(hr) parts.push();
    if(hr) {
      let h = dt.getHours().toString();
      if(min) h = h + ":" + dt.getMinutes().toFixed(2);
      else h = h + ":00";
      parts.push(h);
    }
    return parts.join(' ');
  }

  clickItem(cat: string | null | undefined, code: string | undefined) {
    if(code != null) {
      this.selectitem.emit({cat: cat, code: code});
    }
  }

  animate(ts: number) {
    if(this.animateStart == null) {
      this.animateStart = ts;
    } 
    let elapse = ts - this.animateStart;
    if(elapse > 200) {
      let linearProgress = (elapse - 200) / 1000;
      this.animatePercent = linearProgress * linearProgress * (3.0 - (2.0 * linearProgress));
    }
    if(elapse < 1200) {
      requestAnimationFrame((ts) => this.animate(ts));
    } else {
      this.animatePercent = 1;
    }
  }

}