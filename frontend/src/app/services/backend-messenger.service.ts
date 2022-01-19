import { Inject, Injectable, InjectionToken } from '@angular/core';
import { webSocket as rxjsWebsocket, WebSocketSubject } from 'rxjs/webSocket';
import { PokerGameService } from "./poker-game.service";
import { BehaviorSubject } from "rxjs";

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
export class BackendMessengerService {

  public wsSubject: WebSocketSubject<string>;
  public wsUrl: string;

  public connSubject: BehaviorSubject<boolean>;

  public callbacks: Callback[] = [];

  public messageQueue: MessageQueue = new MessageQueue();


  public onWSOpen = (event: Event) => {
    console.log(`WebSocket Connection opened: ${event.type}`);
    this.connSubject.next(true);
  };

  public onWSClose = (event: CloseEvent) => {
    console.log(`WebSocket Connection closed: ${event.type}`);
    this.connSubject.next(false);
  };

  constructor(
    @Inject(WEBSOCKET_CTOR) private webSocket: typeof rxjsWebsocket,
    private readonly pokerService: PokerGameService
  ) {
    let wsProtocol = (window.location.protocol == 'https:') ? 'wss://' : 'ws://';
    this.wsUrl = wsProtocol + window.location.host + '/api/ws';
    this.wsSubject = webSocket({
      url: this.wsUrl,
      openObserver: { next: this.onWSOpen },
      closeObserver: { next: this.onWSClose }
    });
    this.connSubject = new BehaviorSubject<boolean>(true);
    this.connSubject.subscribe((connected: boolean) => {
      if(connected) {
        this.flushMessageQueue();
      } else {
        this.flagCallbacksInactive();
        this.reconnectWebSocket();
        this.activateCallbacks();
        this.sendMessage("reconnect," +
          this.pokerService.game$.value.gameKey + "," +
          this.pokerService.game$.value.me!.id);
      }
    });
  }

  private flushMessageQueue(): void {
    while(!this.messageQueue.isEmpty()) {
      this.wsSubject.next(this.messageQueue.dequeue());
    }
  }

  private flagCallbacksInactive(): void {
    this.callbacks.forEach((callback: Callback) => {
      callback.isActive = false;
    });
  }

  private reconnectWebSocket(): void {
    this.wsSubject = rxjsWebsocket({
      url: this.wsUrl,
      openObserver: { next: this.onWSOpen },
      closeObserver: { next: this.onWSClose }
    });
  }

  private activateCallbacks(): void {
    this.callbacks.forEach((callback: Callback) => {
      if(!callback.isActive) {
        this.wsSubject.subscribe(callback.func);
        callback.isActive = true;
      }
    });
  }

  public sendMessage(message: string): void {
    this.connSubject.subscribe((connected: boolean) => {
      if(connected) {
        this.wsSubject.next(message);
      } else {
        this.messageQueue.enqueue(message);
      }
    });
  }

  public addCallback(onMessage: (message: string) => void): void {
    this.connSubject.subscribe((connected: boolean) => {
      this.callbacks.push(
        {
          func: onMessage,
          isActive: false
        } as Callback
      );
      if(connected) {
        this.activateCallbacks();
      }
    });
  }
}


interface Callback {
  func: (message: string) => void,
  isActive: boolean
}

class MessageQueue {
  private messages: string[] = [];

  constructor() {}

  public isEmpty(): boolean {
    return this.messages.length === 0;
  }

  public enqueue(msg: string): void {
    this.messages.push(msg);
  }

  public dequeue(): string {
    return this.messages.shift()!;
  }
}
