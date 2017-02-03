import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

  constructor(public storage: Storage) {
  }

  getUserID() {
    return this.storage.get('userID');
  }

  getUserInfo() {
    return this.storage.get('userInfo');
  }  

  setUserID(userID) {
    this.storage.set('userID', userID);
  }

  setUserInfo(userInfo) {
    this.storage.set('userInfo', userInfo);
  }    

}
