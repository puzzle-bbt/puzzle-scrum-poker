import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CardService {

    constructor(private httpClient: HttpClient) { }

    public getCardSvg(cardName: string): Observable<string> {
        return this.httpClient.get(`../assets/images/${cardName}`, {responseType: 'text'});
    }
}
