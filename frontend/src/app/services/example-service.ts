import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { PlayerModel } from '../models/model';

const BASE_URL = '/api';
const BASE_GET_REQUEST_OPTIONS = {
    headers: {
        'responseType': 'json'
    }
}

const BASE_POST_REQUEST_OPTIONS = {
    headers: {
        'content-type': 'application/json'
    }
}

@Injectable({providedIn: 'root'})
export class ExampleService {

    readonly url = '/api';
    constructor(
        private readonly http: HttpClient
    ) {}

    public createTablemaster(tablemasterName: string): Observable<PlayerModel> {
        return this.http.get<PlayerModel>(`${BASE_URL}/createTablemaster/${tablemasterName}`, BASE_GET_REQUEST_OPTIONS)
        .pipe(
            tap(value => console.log('-------->', value)),
            map(data => {
                return {
                    gameKey: data.gameKey,
                    id: data.id,
                    selectedCard: undefined
                } as PlayerModel;
            }),
            catchError(error => {
                console.error('Can not create a table master: ', error);
                return EMPTY;
            })
        )
    }

    public createPlayer(playerName: string, gamekey: string): Observable<PlayerModel> {
        return this.http.get<PlayerModel>(`${BASE_URL}/createPlayer/${playerName}/${gamekey}`, BASE_GET_REQUEST_OPTIONS)
        .pipe(
            tap(value => console.log('-------->', value)),
            map(data => {
                return {
                    gameKey: undefined,
                    id: data.id,
                    selectedCard: undefined
                } as PlayerModel;
            }),
            catchError(error => {
                console.error('Can not create a player: ', error);
                return EMPTY;
            })
        )
    }
}
