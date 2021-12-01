import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from 'rxjs';
import {Player} from "../player";

@Injectable({
    providedIn: 'root'
})
export class PokerGameService {

    private _gamekey?: string;
    private _players?: Player[];
    private _isGameRunning?: boolean;

    private readonly paths = {
        createTablemaster: '/api/createTablemaster/',
        createPlayer: '/api/createPlayer/',
        setSelectedCard: '/api/players/setselectedcard/',
        setPlayerMode: '/api/players/setplayermode/',
        getPlayerMode: '/api/players/getplayermode/',
        getAverage: '/api/average/',
        offboading: '/api/tables/offboarding/',
        kickPlayer: '/api/tables/kickplayer/',
        getPlayers: '/api/tables/getplayers/',
        gameover: '/api/tables/gameover/',
        gamestart: '/api/tables/gameStart/'
    }

    constructor(private httpClient: HttpClient) {
    }

    get gamekey(): string {
        return this._gamekey!;
    }

    set gamekey(value: string) {
        this._gamekey = value;
    }

    get players(): Player[] {
        return this._players!;
    }

    set players(value: Player[]) {
        this._players = value;
    }

    get isGameRunning(): boolean {
        return this._isGameRunning!;
    }

    set isGameRunning(value: boolean) {
        this._isGameRunning = value;
    }

    public createTablemaster(tablemasterName: string): Observable<string> {
        return this.httpClient.get(this.paths.createTablemaster + tablemasterName, {responseType: 'text'}).pipe(
            tap(text => {
                this.gamekey = text.split(",")[0];
                console.log(this.gamekey);
            })
        );
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
        this.isGameRunning = false;
        return this.httpClient.get(this.paths.gameover + gamekey);
    }

    public gamestart(gamekey: string) {
        this.isGameRunning = true;
        return this.httpClient.get(this.paths.gamestart + gamekey);
    }

    public getPlayers(gamekey: string) {
        return this.httpClient.get<Player[]>(this.paths.getPlayers + gamekey, {responseType: 'json'}).pipe(
            tap(players => {
                this.players = players;
            })
        );
    }
}
