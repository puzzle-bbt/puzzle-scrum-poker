import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Player} from "./player";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly paths = {
        createTablemaster: '/createTablemaster/',
        createPlayer: '/createPlayer/',
        setSelectedCard: '/players/setselectedcard/',
        setPlayerMode: '/players/setplayermode/',
        getPlayerMode: '/players/getplayermode/',
        getAverage: '/average/',
        offboading: 'tables/offboarding/',
        kickPlayer: '/tables/kickplayer/',
        getPlayers: '/tables/getplayers/',
        gameover: '/tables/gameover/',
        gamestart: '/tables/gameStart/'
    }

    constructor(private httpClient: HttpClient) {
    }

    public createTablemaster(tablemasterName: string) {
        return this.httpClient.get(this.paths.createTablemaster + tablemasterName, {responseType: 'text'});
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

    public getPlayerMode(gamekey: string, playerid: number) {
        return this.httpClient.get(this.paths.getPlayerMode + gamekey + "/" + playerid);
    }

    public getAverage(gamekey: string) {
        return this.httpClient.get<number>(this.paths.getAverage + gamekey, {responseType: 'json'});
    }

    offboarding(gamekey: string, playerid: number, isTablemaster: object) {
        return this.httpClient.get(this.paths.offboading + gamekey + "/" + playerid + "/" + isTablemaster);
    }

    kickplayer(gamekey: string, playerid: number) {
        return this.httpClient.get(this.paths.kickPlayer + gamekey + "/" + playerid);
    }

    public gameover(gamekey: string) {
        return this.httpClient.get(this.paths.gameover + gamekey);
    }

    public gamestart(gamekey: string) {
        return this.httpClient.get(this.paths.gamestart + gamekey);
    }

    public getPlayers(gamekey: string) {
        return this.httpClient.get<Player[]>(this.paths.getPlayers + gamekey, {responseType: 'json'});
    }
}
