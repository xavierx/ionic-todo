import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  public myBool=false;
  public myClass="todo-title";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
              public dataService: Data,public alertCtrl: AlertController) {

    this.dataService.getData().then((todos) => {

      if(todos){
        this.items = JSON.parse(todos);
      }

    });

  }

  ionViewDidLoad(){

  }

  addItem(){

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if(item){
        this.saveItem(item);
      }

    });

    addModal.present();

  }

  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
    this.dataService.save(this.items);
  }

  doAlert(){
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
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
          }
        }
      ]
    });
    prompt.present();

    this.myClass=  this.myBool? "todo-title":"todo-titledone";

    this.myBool=!this.myBool;

  }

  deleteItem(i){

    // let pos=this.items.indexOf(item);
    this.items.splice(i,1);
    this.dataService.save(this.items);

/*    let alert = this.alertCtrl.create({
      title: 'Delete:  '+item.title,
      // subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
*/

  }

  getClass(i){
    if(i%3==1) return 'todo-title';
    if(i%3!=1) return 'todo-titledone';
    // if(i%3==0) return 'todo-xxxx';

  }

  getItemColor(i){
    if(i%3==1) return 'items-green';
    if(i%3==2) return 'items-blue';
    if(i%3==0) return 'items-pink';
  }




}
