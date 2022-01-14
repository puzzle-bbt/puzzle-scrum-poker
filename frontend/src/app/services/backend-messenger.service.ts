import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { webSocket as rxjsWebsocket, WebSocketSubject } from 'rxjs/webSocket';

// Create a InjectionToken for inject the WebSocketSubject into this service
export const WEBSOCKET_CTOR = new InjectionToken<typeof rxjsWebsocket>(
  'rxjs/webSocket.webSocket', // This is what you'll see in the error when it's missing
  {
    providedIn: 'root',
    factory: () => rxjsWebsocket,
  }
);

@Injectable({
  providedIn: 'root'
})
export class BackendMessengerService implements OnDestroy {

  public wsSubject: WebSocketSubject<string>;
  public wsSubscriptions: Subscription[] = [];

  constructor(
    @Inject(WEBSOCKET_CTOR) private webSocket: typeof rxjsWebsocket
  ) {
    let wsProtocol = (window.location.protocol == 'https:') ? 'wss://' : 'ws://';

    this.wsSubject = webSocket({
      url: wsProtocol + window.location.host + '/api/ws',
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

  public sendMessage(message: string): void {
    this.wsSubject.next(message);
  }
}
