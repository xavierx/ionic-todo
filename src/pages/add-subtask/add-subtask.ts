import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the AddSubtask page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-subtask',
  templateUrl: 'add-subtask.html',
})
export class AddSubtaskPage {

  title;
  priority=false;
  date: String =  new Date().toISOString().substring(0,10);

  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSubtask');
  }

  close(){
    this.view.dismiss();
  }

  saveSubtask() {

    let newSubtask = {
      title: this.title,
      priority: this.priority,
      date: this.date,
    };

    this.view.dismiss(newSubtask);

  }



}
