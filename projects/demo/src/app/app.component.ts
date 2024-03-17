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
      target: 16
    },
    {
      code: "planes",
      label: "Planes",
      value: 13,
      target: 10
    },
    {
      code:"12",
      label: "Another very long title that it won't fit",
      value: 13.87,
      target: 21
    },
    {
      code: "fourth",
      label: "A fourth",
      value: 21.336523,
      target: 18.3
    }
  ]

  singlecatdata: CatItem[] = [{
    code:"",
    label:"",
    series: this.data
  }]; 

  multicatdata: CatItem[] = [];

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
          target: Math.floor(Math.random() * 40) / 10,
        })
      }
      let catcode = c;
      let catlabel = (new Date((new Date()).getTime() + ((c - 30) * 24 * 60 * 60 * 1000))).toISOString();
      this.multicatdata.push({code: catcode.toString(), label: catlabel, series: series});
    }
  }

  select(event: any) {
    setTimeout(() => this.data[0].value++, 1000);
  }
}
