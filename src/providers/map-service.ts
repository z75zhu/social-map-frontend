import { Injectable, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';
import { ConnectivityService } from './connectivity-service';
import { SocketService } from './socket-service'

declare var google;

@Injectable()
export class MapService {

	server: String = 'http://localhost:3000';

	mapElement: ElementRef;
	map: any;
	apiKey: string = 'AIzaSyD4GDxalOfSYAjVlvV-xww0H-rgB5p6NTo';
	mapInitialized: boolean = false;
	connectivityListenersAdded: boolean = false;

	user_location: any;

	constructor(public http: Http, public connectivityService: ConnectivityService) {
	}

	loadMap(mapElement: ElementRef) {

		if(!this.mapElement) {
			this.mapElement = mapElement;
		}

		if(!this.connectivityListenersAdded) {
			this.addConnectivityListeners();
		}

		console.log("Google maps JavaScript needs to be loaded.");

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

		} else {
			console.log("offline, loading map unsuccessful")
			//TODO, maybe show some image holder or warning for being offline
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

			this.user_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			let mapOptions = {
				center: this.user_location,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			this.addMarker(this.user_location, '<h4>this is yifan and zack</h4>');
			console.log('user_location: ' + typeof(this.user_location) + ', ' + this.user_location);

		});

	}

	disableMap() {
		console.log("disable map");
	}

	enableMap() {
		console.log("enable map");

		//TODO, set up socket.io (done at home computer) which should handle disconnect/reconnect.
		//Upload user_location, pull all surrounding locations -> new array of markers
		//On location change, if exceeds a limit range, notify server.
		//Set on-incoming-locations, move corresponding marker

	}

	currentLocation() {

		this.map.setCenter(this.user_location);

	}

	addMarker(position, content){

		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: position
		});        

		this.addInfoWindow(marker, content);

	}

	addInfoWindow(marker, content){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

	}

}
