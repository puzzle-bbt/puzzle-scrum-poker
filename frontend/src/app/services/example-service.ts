import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { OnboardingTableMaster } from '../models/model';

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
    public createTablemaster(tablemasterName: string): Observable<OnboardingTableMaster> {
        return this.http.get<string>(`${BASE_URL}/createTablemaster/${tablemasterName}`)
        .pipe(
            tap(value => console.log('-------->', value)),
            map(data => {
                let dataArray = data.split(',');
                return {
                    tableName: dataArray[0],
                    tablemasterId: dataArray[1]
                } as OnboardingTableMaster;
            }),
            catchError(error => {
                console.log('Can not create a table master: ', error);
                return EMPTY;
            })
        )
    }
}
