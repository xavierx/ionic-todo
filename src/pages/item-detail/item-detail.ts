import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ModalController, NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import {AddSubtaskPage} from "../add-subtask/add-subtask";
import { Data } from '../../providers/data';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

  public items=[];
  public item;
  public nNum:number;

  constructor(public modalCtrl: ModalController,public navParams: NavParams,
              public navCtrl: NavController,public alertCtrl: AlertController,public dataService: Data){


    this.item=this.navParams.get('item');


    this.dataService.getData().then((todos) => {
      if(todos){
        this.items = JSON.parse(todos);
        // console.log(this.items.length);
        this.nNum = this.getIndex(this.item,this.items);


        console.log("item is ==> "+this.item);
        console.log("items is ==> "+this.items);

        console.log("nNum is ==> "+this.nNum);
      }
    });


    // console.log(this.item);

  }


  ionViewDidLoad() {

    // this.item=this.navParams.get('item');
    // console.log(this.item);
    // this.title = this.navParams.get('item').title;
    // this.description = this.navParams.get('item').description;
    // this.myDate = this.navParams.get('item').myDate;
    // this.children = this.navParams.get('item').children;
  }


//废弃
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
            this.item.children.push({c_title: data.title , isFin:false})

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
        if(this.nNum>=0){
          this.items[this.nNum].children.push({c_title: subtask.title , c_date:subtask.date,
            c_priority:subtask.priority, c_isFin:false});
          this.item.children=this.items[this.nNum].children;
          this.dataService.save(this.items);
        }


      }

    });

    addModal.present();

  }

  completeSubtask(i){

    console.log("|||"+i);
    console.log(this.items[this.nNum].children);
    console.log(this.item.children);

    this.items[this.nNum].children.splice(i,1);
    this.item.children.splice(i,1);
    this.dataService.save(this.items);

  }

  finSubtask(i) {

      this.items[this.nNum].children[i].c_isFin=this.item.children[i].c_isFin;
      this.dataService.save(this.items);


  }


  getIndex(item,items):number{
    for(let i=0;i<items.length;i++){
      if(items[i].title===item.title && items[i].dis===item.dis){

        return i;
      }
    }
    return -1;
  }



}
