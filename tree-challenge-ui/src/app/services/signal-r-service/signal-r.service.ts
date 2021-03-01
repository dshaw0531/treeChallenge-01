import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  signalReceived = new EventEmitter<any>();

  constructor() { 
    this.buildConnection();
    this.startConnection();
  }

  public buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://treechallengeapi-04.azurewebsites.net/factoryHub")
      .build();
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);

        setTimeout(() => {
          this.startConnection();
        }, 3000);
      });
  };

  private registerSignalEvents() {
    this.hubConnection.on("ListChanged", data => {
      this.signalReceived.emit(data)
    })
  }
}
