import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { ChatPage } from '../pages/chat/chat';
import { ContactPage } from '../pages/contact/contact';

import { MapService } from '../providers/map-service';
import { ConnectivityService } from '../providers/connectivity-service';
import { SocketService } from '../providers/socket-service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapPage,
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
    ChatPage,
    ContactPage
  ],
  providers: [MapService, ConnectivityService, SocketService]
})
export class AppModule {}
