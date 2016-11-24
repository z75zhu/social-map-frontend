import { Injectable, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';
import { ConnectivityService } from './connectivity-service';

declare var google;

@Injectable()
export class MapService {

	mapElement: ElementRef;
	map: any;
	apiKey: string = 'AIzaSyD4GDxalOfSYAjVlvV-xww0H-rgB5p6NTo';
	mapInitialized: boolean = false;
	connectivityListenersAdded: boolean = false;

	constructor(public http: Http, public connectivityService: ConnectivityService) {
	}

	loadMap(mapElement: ElementRef) {

		if(!this.mapElement) {
			this.mapElement = mapElement;
		}

		if(!this.connectivityListenersAdded) {
			this.addConnectivityListeners();
		}

		if(typeof google == "undefined" || typeof google.maps == "undefined") {

			console.log("Google maps JavaScript needs to be loaded.");
			this.disableMap();

			if(this.connectivityService.isOnline()) {
				console.log("online, loading map");

				//Load the SDK
				window['mapInit'] = () => {
					this.initMap();
					this.enableMap();
				}

				let script = document.createElement("script");
				script.id = "googleMaps";

				if(this.apiKey) {
					script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
				} else {
					script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
				}

				document.body.appendChild(script);  

			} 
		}
		else {

			if(this.connectivityService.isOnline()) {
				console.log("showing map");
				this.initMap();
				this.enableMap();
			}
			else {
				console.log("disabling map");
				this.disableMap();
			}

		}

	}

	addConnectivityListeners() {

		let onOnline = () => {

			setTimeout(() => {
				if(typeof google == "undefined" || typeof google.maps == "undefined"){

					this.loadMap(this.mapElement);

				} else {

					if(!this.mapInitialized) {
						this.initMap();
					}

					this.enableMap();
				}
			}, 2000);

		};

		let onOffline = () => {
			this.disableMap();
		};

		document.addEventListener('online', onOnline, false);
		document.addEventListener('offline', onOffline, false);
		this.connectivityListenersAdded = true;

	}

	initMap(){

		this.mapInitialized = true;

		Geolocation.getCurrentPosition().then((position) => {

			let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			let mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

		});

	}

	disableMap() {
		console.log("disable map");
	}

	enableMap() {
		console.log("enable map");
	}

	currentLocation() {

		Geolocation.getCurrentPosition().then((position) => {

			let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			this.map.setCenter(latLng);

		});

	}

/*	addMarker(){

		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: this.map.getCenter()
		});

		let content = "<h4>Information!</h4>";          

		this.addInfoWindow(marker, content);

	}*/

	addInfoWindow(marker, content){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

	}

}
