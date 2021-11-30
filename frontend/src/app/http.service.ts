import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Player} from "./player";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly paths = {
        createTablemaster: '/api/createTablemaster/',
        createPlayer: '/api/createPlayer/',
        setSelectedCard: '/api/players/setselectedcard/',
        setPlayerMode: '/api/players/setplayermode/',
        getAverage: '/api/average/',
        getPlayers: '/api/tables/getplayers/'
    }

    constructor(private httpClient: HttpClient) {
    }

    public createTablemaster(tablemasterName: string, tablename: string): Observable<string> {
        return this.httpClient.get(this.paths.createTablemaster + tablemasterName + "/" + tablename, {responseType: 'text'});
    }

    public createPlayer(gamekey: string, playername: string) {
        return this.httpClient.get<number>(this.paths.createPlayer + playername + "/" + gamekey, {responseType: 'json'});
    }

    public setSelectedCard(gamekey: string, playerid: number, selectedCard: string) {
        return this.httpClient.get(this.paths.setSelectedCard + gamekey + "/" + playerid + "/" + selectedCard, {responseType: 'text'});
    }

    public setPlayerMode(gamekey: string, playerid: number, isPlaying: boolean) {
        return this.httpClient.get(this.paths.setPlayerMode + gamekey + "/" + playerid + "/" + isPlaying);
    }

    public getAverage(gamekey: string) {
        return this.httpClient.get<number>(this.paths.getAverage + gamekey, {responseType: 'json'});
    }

    public getPlayers(gamekey: string) {
        return this.httpClient.get<Player[]>(this.paths.getPlayers + gamekey, {responseType: 'json'});
    }
}
