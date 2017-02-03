import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { MapService } from '../../providers/map-service';
import { User, UserInfo, GENDER } from './user-model';
import { UserService } from '../../providers/user-service';
import { UserInfoPage } from '../../pages/user-info/user-info';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  user: User;

  constructor(public navCtrl: NavController, public platform: Platform, public modalCtrl: ModalController, public mapService: MapService, public userService: UserService) {
    this.platform.ready().then((readySource) => {
      this.initUser();        
    })    
  }

  initUser() {

    this.user = new User(null, new UserInfo(null, GENDER.UNSPECIFIED), null);

    this.userService.getUserID().then((userID) => {
      if(userID) {
        this.user.userID = userID;
      }
    });

    this.userService.getUserInfo().then((userInfo) => {
      if(userInfo) {
        this.user.userInfo = userInfo;
      }

      this.collectUserInfo();

    });    

  }

  collectUserInfo() {
    let modal = this.modalCtrl.create(UserInfoPage, { userInfo: this.user.userInfo }, { showBackdrop: true, enableBackdropDismiss: false });
    modal.onDidDismiss(userInfo => {
      this.user.userInfo = userInfo;
      this.userService.setUserInfo(this.user.userInfo);
      this.loadMap();
    });
    modal.present();    
  }

  loadMap() {
    this.mapService.loadMap(this.mapElement, this.user);
  }

  ionViewDidLoad() {}

	currentLocation() {
		this.mapService.currentLocation();
	}

}