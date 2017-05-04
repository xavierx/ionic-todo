import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ModalController, NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import {AddSubtaskPage} from "../add-subtask/add-subtask";

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

  title;
  description;
  myDate;
  children;

  constructor(public modalCtrl: ModalController,public navParams: NavParams,
              public navCtrl: NavController,public alertCtrl: AlertController){

  }

  ionViewDidLoad() {
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
    this.myDate = this.navParams.get('item').myDate;
    this.children = this.navParams.get('item').children;
  }



  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: "Add your subtask ",
      inputs: [
        {
          name: 'title',
          placeholder: 'Subtask'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            this.children.push({c_title: data.title , isFin:false})

          }
        }
      ]
    });
    prompt.present();
  }

  addSubtask(){

    let addModal = this.modalCtrl.create(AddSubtaskPage);

    addModal.onDidDismiss((subtask) => {

      if(subtask){
        this.children.push({c_title: subtask.title , c_date:subtask.date,
          c_priority:subtask.priority, c_isFin:false})
      }

    });

    addModal.present();

  }

  completeSubtask(i){

    this.children.splice(i,1);
    // this.dataService.save(this.items);



  }



}
