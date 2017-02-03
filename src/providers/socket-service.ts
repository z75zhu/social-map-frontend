import { Injectable } from '@angular/core';

import * as io from "socket.io-client";


@Injectable()
export class SocketService {

  server: String = 'http://localhost:3000';
	socket: any;

  constructor() {
  }

  connect(server: String) {
  	this.socket = io.connect(this.server);
  }

  emit(event: String, data: Object) {
  	this.socket.emit(event, data);
  }

  on(event: String, callback: Function) {
  	this.socket.on(event, callback);
  }

}
