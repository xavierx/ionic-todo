import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';


import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
  // template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {

    });
  }
}

