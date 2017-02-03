import { Injectable, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';
import { ConnectivityService } from './connectivity-service';
import { SocketService } from './socket-service';
import { LoadingController } from 'ionic-angular';

import { User, UserInfo, GENDER } from '../pages/map/user-model';

declare var google;

@Injectable()
export class MapService {

	mapElement: ElementRef;
	map: any;
	mapMask: any;
	apiKey: string = 'AIzaSyD4GDxalOfSYAjVlvV-xww0H-rgB5p6NTo';
	mapInitialized: boolean = false;
	connectivityListenersAdded: boolean = false;

	user: User;

	constructor(public http: Http, public connectivityService: ConnectivityService, public socketService: SocketService, public loadingCtrl: LoadingController) {
		this.mapMask = this.loadingCtrl.create({
			spinner: 'hide',
			content: 'You must be connected to the Internet to view the map.'
		});
	}

	loadMap(mapElement: ElementRef, user: User) {

		if(!this.mapElement) {
			this.mapElement = mapElement;
		}

		if(!this.user) {
			this.user = user;
		}

		if(!this.connectivityListenersAdded) {
			this.addConnectivityListeners();
		}

		console.log("Google maps JavaScript needs to be loaded.");

		if(this.connectivityService.isOnline()) {
			console.log("online, loading map");

			//Load the SDK
			window['mapInit'] = () => {
				this.initMap().then(() => {
					this.enableMap();
				});
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
			this.mapMask.present();
		}

	}

	addConnectivityListeners() {

		let onOnline = () => {

			setTimeout(() => {
				if(typeof google == "undefined" || typeof google.maps == "undefined") {

					this.loadMap(this.mapElement, this.user);

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

		this.connectivityService.onConnect(onOnline);
		this.connectivityService.onDisconnect(onOffline);
		this.connectivityListenersAdded = true;

	}

	initMap(){

		this.mapInitialized = true;

		return Geolocation.getCurrentPosition().then((position) => {

			this.user.userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			let mapOptions = {
				center: this.user.userLocation,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			}

			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			this.addMarker(this.user.userLocation, this.user.userInfo);
			console.log('userLocation: ' + typeof(this.user.userLocation) + ', ' + this.user.userLocation);

		});

	}

	enableMap() {
		console.log("enable map");
		this.mapMask.dismiss();
		//TODO, set up socket.io (done at home computer) which should handle disconnect/reconnect.
		//Upload userLocation, pull all surrounding locations -> new array of markers
		//On location change, if exceeds a limit range, notify server.
		//Set on-incoming-locations, move corresponding marker

/*		this.socketService.connect();
		this.socketService.on('news', (data) => {
			console.log(data);
			this.socketService.emit('my other event', { my: 'data' });
		});		*/

	}

	disableMap() {
		console.log("disable map");
		this.mapMask.present();
	}

	currentLocation() {

		this.map.setCenter(this.user.userLocation);

	}

	addMarker(position, userInfo: UserInfo){
//'../../assets/marker/male_35.png'
		let icon;
		if(userInfo.gender == GENDER.MALE) {
			icon = '../../assets/marker/male_35.png';
		} else {
			icon = '../../assets/marker/female_35.png';
		}

		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: position,
			icon: icon
		});

		this.addInfoWindow(marker, userInfo);

	}

	addInfoWindow(marker, userInfo: UserInfo){

		let infoWindow = new google.maps.InfoWindow({
			content: '<h4>' +
				userInfo.nickname +
				'</h4>'
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

	}

}
