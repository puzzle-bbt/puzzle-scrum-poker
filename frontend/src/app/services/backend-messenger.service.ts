import { Inject, Injectable, InjectionToken } from '@angular/core';
import { webSocket as rxjsWebsocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, catchError, of } from "rxjs";
import { Game } from "../models/model";

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

  public isConnected: boolean;
  public connSubject: BehaviorSubject<boolean>;

  public callbacks: Callback[] = [];

  public messageQueue: MessageQueue = new MessageQueue();

  public game$: BehaviorSubject<Game> | undefined;


  private webSocketOnOpen = (event: Event) => {
    console.log('WebSocket: Connection opened ', event);
    this.connSubject.next(true);
  };

  private webSocketOnClose = (event: CloseEvent) => {
    console.log('WebSocket: Connection closed ', event);
    this.connSubject.next(false);
  };

  constructor(
    @Inject(WEBSOCKET_CTOR) private webSocket: typeof rxjsWebsocket) {
    let wsProtocol = (window.location.protocol == 'https:') ? 'wss://' : 'ws://';
    this.wsUrl = wsProtocol + window.location.host + '/api/ws';
    this.wsSubject = webSocket({
      url: this.wsUrl,
      openObserver: { next: this.webSocketOnOpen },
      closeObserver: { next: this.webSocketOnClose }
    });
    this.connSubject = new BehaviorSubject<boolean>(true);
    this.isConnected = true;
    this.connSubject.subscribe((connected: boolean) => {
      this.isConnected = connected;
    });
    this.connSubject.subscribe((connected: boolean) => {
      if(connected) {
        this.flushMessageQueue();
      } else {
        this.flagCallbacksInactive();
        this.reconnectWebSocket();
        this.activateCallbacks();
        this.sendMessage("reconnect,"+
          this.game$!.value.gameKey+","+
          this.game$!.value.me!.id+","+
          this.game$!.value.me!.name+","+
          this.game$!.value.me!.selectedCard+","+
          this.game$!.value.iAmTableMaster);
      }
    });
  }

  // can't do this via dependency injection because of a mutual dependency
  public setGame(game$: BehaviorSubject<Game>): void {
    this.game$ = game$;
  }

  private flushMessageQueue(): void {
    console.log("WebSocket: Flushing message queue...");
    while(!this.messageQueue.isEmpty()) {
      let message = this.messageQueue.dequeue();
      console.log('WebSocket: -------->', message);
      this.wsSubject.next(message);
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
      openObserver: { next: this.webSocketOnOpen },
      closeObserver: { next: this.webSocketOnClose }
    });
  }

  private activateCallbacks(): void {
    this.callbacks.forEach((callback: Callback) => {
      if(!callback.isActive) {
        this.wsSubject.pipe(
          catchError(error => {
            console.log('WebSocket: An error was received by a subscriber to the connection: ', error);
            return of('');
          })
        ).subscribe(callback.func);
        callback.isActive = true;
      }
    });
  }

  public sendMessage(message: string): void {
    if(this.isConnected) {
      console.log('WebSocket: -------->', message);
      this.wsSubject.next(message);
    } else {
      this.messageQueue.enqueue(message);
    }
  }

  public subscribe(onMessage: (message: string) => void): void {
    this.callbacks.push(
      {
        func: onMessage,
        isActive: false
      } as Callback
    );
    if(this.isConnected) {
      this.activateCallbacks();
    }
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
