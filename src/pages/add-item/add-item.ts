import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {

  title;
  description;
  myDate: String =  new Date().toISOString().substring(0,10);



  constructor(public navCtrl: NavController, public view: ViewController) {

  }

  saveItem(){

    let todayDate=new Date().toISOString().substring(0,10);

    let newItem = {
      title: this.title,
      description: this.description,
      myDate:this.myDate,
      dis:this.getDis(todayDate,this.myDate),
      workTime:0,
      children:[],
    };

    this.view.dismiss(newItem);

  }

  close(){
    this.view.dismiss();
  }

  getDis(ds1,ds2):number{
    let d1=new Date(ds1);
    let d2=new Date(ds2);
    let disM=d2.getTime()-d1.getTime();
    let days=Math.floor(disM/(24*3600*1000))
    return days;
  }

  sayHello(){
    return "hello";
  }

}
