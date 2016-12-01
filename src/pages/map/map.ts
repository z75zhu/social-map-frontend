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
  }

 
  ionViewDidLoad(){
    this.mapService.loadMap(this.mapElement);
  }

	currentLocation(){
		this.mapService.currentLocation();
	}


}