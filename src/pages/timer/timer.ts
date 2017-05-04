import { Component } from '@angular/core';


@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})

export class TimerPage {

  gaming: string = "n64";
  gender: string = "f";
  os: string;
  music: string;
  month: string;
  year: number;
  items;

  musicAlertOpts: { title: string, subTitle: string };

  constructor() {
    this.musicAlertOpts = {
      title: '1994 Music',
      subTitle: 'Select your favorite'
    }
    this.initializeItems();
  }

  stpSelect() {
    console.log('STP selected');
  }

  initializeItems() {
    this.items = [
      'Abstract',
      'Clean',
      'Homework',
      'GRE',
      'TOEFL',
      'Work'
    ];
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
