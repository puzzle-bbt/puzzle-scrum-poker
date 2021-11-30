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

    // TODO: '/api/createTablemaster' sollte auch ein JSON zurück liefern
    public createTablemaster(tablemasterName: string): Observable<PlayerModel> {
        return this.http.get(`${BASE_URL}/createTablemaster/${tablemasterName}`, {responseType: 'text'})
        .pipe(
            tap(value => console.log('-------->', value)),
            map(data => {
                let dataArray = data.split(',');
                return {
                    gameKey: dataArray[0],
                    id: dataArray[1],
                    selectedCard: undefined
                } as PlayerModel;
            }),
            catchError(error => {
                console.error('Can not create a table master: ', error);
                return EMPTY;
            })
        )
    }
}
