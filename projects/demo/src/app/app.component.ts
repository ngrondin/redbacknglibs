import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  data=[
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
      label: "Another very long title that it won't fit",
      value: 13.87
    },
    {
      code: "fourth",
      label: "A fourth",
      value: 1250029
    }
  ]

  colormap={
    "cars":"red",
    "planes":"blue",
    "fourth":"pink"
  }

  select(event: any) {
    //alert(event.label);
    setTimeout(() => this.data[0].value++, 1000);
  }
}
