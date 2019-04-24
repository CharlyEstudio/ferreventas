import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor() {
    //
  }
}
