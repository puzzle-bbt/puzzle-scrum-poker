import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendMessengerService implements OnDestroy {

  private wsSubject: WebSocketSubject<string> = webSocket({
    url: 'ws://' + window.location.host + '/api/ws',
    openObserver: {
      next: (event) => {
        console.log(`websocket connection opened: ${event.type}`);
      }
    },
    closeObserver: {
      next: (event) => {
        console.log(`websocket connection closed: ${event.type}`);
      }
    }
  });

  private wsSubscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnDestroy(): void {
    if (this.wsSubscriptions.length > 0) {
      this.wsSubject.complete();
    }
  }

  public subscribe(onMessage: (message: string) => void): void {
    this.wsSubscriptions.push(
      this.wsSubject.subscribe(onMessage)
    );
  }

  public sendMessage(message: string) {
    this.wsSubject.next(message);
  }
}
