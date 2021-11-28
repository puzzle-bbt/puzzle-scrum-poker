import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

    private wsSubject : WebSocketSubject<string>;

    constructor() {
        this.wsSubject = webSocket({
            url: 'ws://' + window.location.host + '/.table',
            openObserver: {
                next: (event) => {
                    console.log(event);
                }
            },
            closeObserver: {
                next: (event) => {
                    console.log(event);
                }
            }
        });
    }

    public openWSConnection(onMessage: any): void {
        this.wsSubject.subscribe(onMessage);
    }

    public sendWSMessage(wsMessage: string): void {
        this.wsSubject.next(wsMessage);
    }

    public closeWSConnection(): void {
        this.wsSubject.complete();
    }
}


