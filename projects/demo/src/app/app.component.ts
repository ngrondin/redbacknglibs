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
      value: 14
    },
    {
      code: "planes",
      label: "Planes",
      value: 13
    },
    {
      code:"12",
      label: "Another very long title that it won't fit",
      value: 13.87
    },
    {
      code: "fourth",
      label: "A fourth",
      value: 1250029
    }
  ]

  catdata: CatItem[] = []; 

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
    let catCount = 20;
    let schools = ["123", "124", "125", "126", "127", "128", "129"]
    let schoolLables = ["St George", "St Mary", "Servite", "Seton", "Aquinas", "Girls", "Boys"]
    for(let c = 0; c < catCount; c++) {
      let seriesCount = Math.floor(Math.random() * schools.length);
      let series = [];
      for(let j = 0; j < seriesCount; j++) {
        series.push({
          code:schools[j],
          label:schoolLables[j],
          value: Math.random() * 4
        })
      }
      let catcode = c;
      let catlabel = (new Date((new Date()).getTime() + ((c - 30) * 24 * 60 * 60 * 1000))).toISOString();
      this.catdata.push({code: catcode.toString(), label: catlabel, series: series});
    }
  }

  select(event: any) {
    //alert(event.label);
    setTimeout(() => this.data[0].value++, 1000);
  }
}
