import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { UserInfoPage } from '../pages/user-info/user-info';
import { ChatPage } from '../pages/chat/chat';
import { ContactPage } from '../pages/contact/contact';

import { MapService } from '../providers/map-service';
import { ConnectivityService } from '../providers/connectivity-service';
import { SocketService } from '../providers/socket-service';
import { UserService } from '../providers/user-service';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapPage,
    UserInfoPage,
    ChatPage,
    ContactPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MapPage,
    UserInfoPage,
    ChatPage,
    ContactPage
  ],
  providers: [MapService, ConnectivityService, SocketService, UserService, Storage]
})
export class AppModule {}
