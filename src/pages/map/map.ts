import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapService } from '../../providers/map-service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public mapService: MapService) {
    // let socket = io.connect('http://localhost');
    // socket.on('news', function (data) {
    //   console.log(data);
    //   socket.emit('my other event', { my: 'data' });
    // });
  }

 
  ionViewDidLoad(){
    this.mapService.loadMap(this.mapElement);
  }

	currentLocation(){

		this.mapService.currentLocation();
	}


}