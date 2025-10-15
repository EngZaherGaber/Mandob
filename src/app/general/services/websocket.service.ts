import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private hubConnection!: signalR.HubConnection;
  private messageSource = new ReplaySubject<string>(50);
  public message$ = this.messageSource.asObservable(); // subscribe to this in components

  startConnection(userId: number): void {
    if (this.hubConnection) return; // prevent multiple connections

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/notificationHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('✅ SignalR Connected');
        this.sendMessageToServer('RegisterUser', userId);
      })
      .catch((err) => console.error('❌ SignalR Error:', err));

    // Listen for notifications
    this.hubConnection.on('ReceiveNotification', (message: string) => {
      console.log('📩 Notification:', message);
      this.messageSource.next(message); // broadcast message to subscribers
    });
  }

  sendMessageToServer(method: string, payload?: any): void {
    this.hubConnection?.invoke(method, payload).catch((err) => console.error('Send failed', err));
  }

  stopConnection(): void {
    this.hubConnection?.stop();
    this.hubConnection = undefined!;
    console.log('🔌 SignalR Disconnected');
  }
}
