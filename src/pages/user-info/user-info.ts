import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';

import { UserInfo, GENDER } from '../map/user-model';

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {

	userInfo: UserInfo;
	maleButtonOutline: boolean = true;
  femaleButtonOutline: boolean = true;

  constructor(public viewCtrl: ViewController, public params: NavParams,public alertCtrl: AlertController) {
  	this.userInfo = params.get('userInfo');
    if(this.userInfo.gender == GENDER.MALE) {
      this.maleButtonOutline = false;
    } else if (this.userInfo.gender == GENDER.FEMALE) {
      this.femaleButtonOutline = false;
    } else {
      //this.userInfo.gender == GENDER.UNSPECIFIED
      //DO NOTHING!!!
    }
  }

  ionViewDidLoad() {}

  setMale() {
  	this.userInfo.gender = GENDER.MALE;
    this.maleButtonOutline = false;
    this.femaleButtonOutline = true;
  }

  setFemale() {
  	this.userInfo.gender = GENDER.FEMALE;
    this.maleButtonOutline = true;
    this.femaleButtonOutline = false;
  }

  isMaleOutlined() {
    return !(this.userInfo.gender === GENDER.MALE);
  }

  alertGenderNotSelected() {
    let alert = this.alertCtrl.create({
    title: 'Please select your gender.',
    buttons: ['Dismiss']
    });
    alert.present();
  }

	dismiss() {
    if(this.userInfo.gender != GENDER.UNSPECIFIED) {
      let data = this.userInfo;
      this.viewCtrl.dismiss(data);
    } else {
      this.alertGenderNotSelected();
    }   
	}

}
