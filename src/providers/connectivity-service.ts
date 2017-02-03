import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
 
@Injectable()
export class ConnectivityService {

  connectSubscription;
  disconnectSubscription;

  constructor(){
  }
 
  isOnline(): boolean {
    return Network.connection !== 'none';
  }
 
  isOffline(): boolean {
    return !this.isOnline();
  }

  onConnect(onOnConnect: Function) {
    this.connectSubscription = Network.onConnect().subscribe(() => {
      onOnConnect();
    });
  }

  onDisconnect(onOnDisonnect: Function) {
    this.disconnectSubscription = Network.onDisconnect().subscribe(() => {
      onOnDisonnect();
    });
  }

}
