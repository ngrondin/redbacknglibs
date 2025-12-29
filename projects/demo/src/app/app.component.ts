import { Component, OnInit } from '@angular/core';
import { CatItem, DataItem } from 'projects/redbackgraphs/src/lib/datamodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'demo';
  data: DataItem[] = [
    {
      code: "cars",
      label: "Cars",
      value: 14,
      altvalue: 15,
      target: 16
    },
    {
      code: "planes",
      label: "Planes",
      value: 13,
      altvalue: 8,
      target: 10
    },
    {
      code:"12",
      label: "Another very long title that it won't fit",
      value: 13.87,
      altvalue: 24,
      target: 21
    },
    {
      code: "fourth",
      label: "A fourth",
      value: 21.336523,
      altvalue: 12,
      target: 18.3
    }
  ]

  singlecatdata: CatItem[] = [{
    code:"",
    label:"",
    series: this.data,
    color: undefined,
    altvalue: undefined,
    target: undefined
  }]; 

  multicatdata: CatItem[] = [];

  timedata: DataItem[] = [];

  durdata: DataItem[] = [];

  colormap={
    "cars":"red",
    "planes":"blue",
    "fourth":"pink"
  }

  colorscheme=['#1C4E80', '#0091D5', '#A5D8DD', '#EA6A47', '#7E909A', '#202020']

  valuecolorrange = [
    {from:0, to:13.5, color:"blue", oncolor:"orange"},
    {from:13.5, to:20, color:"yellow", oncolor:"black"},
    {from:20, to:4000000, color:"red", oncolor:"violet"},
  ]

  ngOnInit(): void {
    let catCount = 8;
    let schools = ["123", "124", "125", "126", "127", "128", "129"]
    let schoolLables = ["St George", "St Mary", "Servite", "Seton", "Aquinas", "Girls", "Boys"]
    for(let c = 0; c < catCount; c++) {
      let seriesCount = Math.floor(Math.random() * schools.length);
      let series: DataItem[] = [];
      for(let j = 0; j < seriesCount; j++) {
        series.push({
          code:schools[j],
          label:schoolLables[j],
          value: Math.floor(Math.random() * 40) / 10,
          altvalue: Math.floor(Math.random() * 40) / 10,
          target: Math.floor(Math.random() * 40) / 10,
        })
      }
      let catlabel = (new Date((new Date()).getTime() + (c * 6 * 60 * 60 * 1000))).toISOString();
      let catcolor = undefined; 
      this.multicatdata.push({code: catlabel, label: catlabel, series: series, color: catcolor, altvalue: 10, target: 12});
    }

    let timeCount = 72;
    for(let i = 0; i < timeCount; i++) {
      let dt = (new Date((new Date()).getTime() + (i * 1 * 60 * 60 * 1000)))
      this.timedata.push({
        code: dt.toISOString(),
        label: dt.toISOString(),
        value: 10*Math.random(),
        altvalue: 10*Math.random(),
        target: undefined
      });
      if(Math.random() > 0.8) {
        i++;
      }
    }

    for(let i = 0; i < 5; i++) {
      this.durdata.push({
        code:"dur" + i,
        label:"dur" + i,
        value: Math.random() * (48*3600000),
        altvalue: undefined,
        target: undefined
      })
    }
  }

  select(event: any) {
    setTimeout(() => this.data[0].value++, 1000);
  }
}
