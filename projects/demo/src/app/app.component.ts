import { Component } from '@angular/core';
import { CatItem, DataItem } from 'projects/redbackgraphs/src/lib/datamodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  catdata: CatItem[] =[
    {
      code:"32030399",
      label:"14 Feb",
      series:[
        {
          code:"123",
          label:"St Mary",
          value:2
        },
        {
          code:"124",
          label:"St George",
          value:4
        }        
      ]
    },
    {
      code:"42030399",
      label:"15 Feb",
      series:[
        {
          code:"123",
          label:"St Mary",
          value:1
        },
        {
          code:"125",
          label:"Seton",
          value:3
        }        
      ]
    }, 
    {
      code:"52030399",
      label:"16 Feb",
      series:[
        {
          code:"126",
          label:"Servite",
          value:1
        },
        {
          code:"127",
          label:"Santa",
          value:2
        },
        {
          code:"125",
          label:"Seton",
          value:3
        },
        {
          code:"123",
          label:"St Mary",
          value:1
        }          
      ]
    },
    {
      code:"62030399",
      label:"17 Feb",
      series:[
        {
          code:"123",
          label:"St Mary",
          value:2
        },
        {
          code:"124",
          label:"St Geoarge",
          value:4
        }        
      ]
    },
    {
      code:"72030399",
      label:"18 Feb",
      series:[
        {
          code:"123",
          label:"St Mary",
          value:2
        },
        {
          code:"124",
          label:"St Geoarge",
          value:4
        }        
      ]
    },
    {
      code:"72030399",
      label:"19 Feb",
      series:[
        {
          code:"125",
          label:"Seton",
          value:1
        },
        {
          code:"124",
          label:"St Geoarge",
          value:3
        }        
      ]
    }              
  ]

  colormap={
    "cars":"red",
    "planes":"blue",
    "fourth":"pink"
  }

  colorscheme=['#1C4E80', '#0091D5', '#A5D8DD', '#EA6A47', '#7E909A', '#202020']

  select(event: any) {
    //alert(event.label);
    setTimeout(() => this.data[0].value++, 1000);
  }
}
