import { Component } from '@angular/core';
import {ToastController} from "ionic-angular";
import { Data } from '../../providers/data';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})

export class TimerPage {

  private A_MINITE=25;
  private A_SECOND=0;

  public sTimerState="Start";
  public t_second:number=this.A_SECOND;
  public t_minute:number=this.A_MINITE;
  public bGo=false;
  public taskNum;
  public items=[];
  public nowItem;

  constructor(private toastCtrl: ToastController,public dataService: Data) {

    this.dataService.getData().then((todos) => {
      if(todos){
        this.items = JSON.parse(todos);
        this.nowItem=0;
        console.log("get "+this.items.length+" items!");
      }
    });

  }

  ionViewDidLoad(){

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Congratulations!!!',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  pushTimer(){
    console.log("!!!");
    this.bGo=!this.bGo;
    console.log(this.bGo);
    if(this.bGo){
      this.sTimerState="Stop";
      this.taskNum=setInterval(() => {
        this.timerGo();
      }, 1000);
    }else{
      clearInterval(this.taskNum);
      this.sTimerState="Go on";
    }

  }

  timerGo(){
    if(this.bGo){
      if(this.t_second>0){
        this.t_second-=1;
        console.log(this.t_second);
      }else if(this.t_minute>0){
        this.t_minute-=1;
        this.t_second=59;
      }else{
        this.bGo=!this.bGo;
        this.presentToast();
        this.finishTomato(this.nowItem);
        this.setTomato();
      }
    }

  }

  setTomato(){
    this.t_second=this.A_SECOND;
    this.t_minute=this.A_MINITE;
  }

  finishTomato(i){
    this.items[i].workTime+=25;
    console.log(this.items[i].title+" done 25");
    this.dataService.save(this.items);
  }

  getTitle(){
    if(this.items.length>0){
      return this.items[this.nowItem].title;
    }else{
      return "";
    }
  }

  getWorkTime(){
    if(this.items.length>0){
      return this.items[this.nowItem].workTime+"";
    }else{
      return "";
    }
  }


}
