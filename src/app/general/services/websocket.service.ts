import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private hubConnection!: signalR.HubConnection;
  private messageSource = new ReplaySubject<any>(50);
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
        this.sendMessageToServer('OnNotification', { type: 'login', value: { Sec: this.hashUserId(userId) } });
      })
      .catch((err) => console.error('❌ SignalR Error:', err));

    // Listen for notifications
    this.hubConnection.on('OnNotification', (message: any) => {
      const type = message.type;
      switch (type) {
        case 'register':
          if (!message.value?.success) {
            this.stopConnection();
            this.startConnection(userId);
          }
          break;
        case 'old_notifications':
          this.messageSource.next(message);
          break;
        default:
          break;
      }
    });
  }
  private hashUserId(userId: number): string {
    const plainText = userId.toString();
    return btoa(unescape(encodeURIComponent(plainText)));
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
