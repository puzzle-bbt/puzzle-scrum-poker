import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, tap} from 'rxjs';
import {Player} from "../player";
import {PlayerModel} from "../models/model";
import {RoundInfoModel} from "../models/RoundInfoModel";

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

@Injectable({
    providedIn: 'root'
})
export class PokerGameService {

    private _gamekey?: string;
    private _id: number | null = null;
    private _players?: Player[];
    private _isGameRunning?: boolean;
    private _isTablemaster: boolean | null = null;

    readonly url = '/api';
    constructor(
      private readonly httpClient: HttpClient
    ) {}

    get gamekey(): string {
        return this._gamekey!;
    }

    set gamekey(value: string) {
        this._gamekey = value;
    }

    get id(): number | null {
      return this._id;
    }

    set id(value: number | null) {
      this._id = value;
    }

    get isTablemaster(): boolean | null {
      return this._isTablemaster;
    }

    set isTablemaster(value: boolean | null) {
      this._isTablemaster = value;
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

    public createTablemaster(tablemasterName: string): Observable<PlayerModel> {
      return this.httpClient.get<PlayerModel>(`${BASE_URL}/createTablemaster/${tablemasterName}`, BASE_GET_REQUEST_OPTIONS)
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
      return this.httpClient.get<PlayerModel>(`${BASE_URL}/createPlayer/${playerName}/${gamekey}`, BASE_GET_REQUEST_OPTIONS)
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

    public setSelectedCard(gamekey: string, playerid: number, selectedCard: string): Observable<string> {
        return this.httpClient.get<string>(`${BASE_URL}/players/setselectedcard/${gamekey}/${playerid}/${selectedCard}`, BASE_GET_REQUEST_OPTIONS)
            .pipe(
                tap(value => console.log('-------->', value)),
                catchError(error => {
                    console.error('Can not select card: ', error);
                    return EMPTY;
                })
            )
    }

    public setPlayerMode(gamekey: string, playerid: number, isPlaying: boolean): Observable<void> {
        return this.httpClient.get<void>(`${BASE_URL}/players/setplayermode/${gamekey}/${playerid}/${isPlaying}`, BASE_GET_REQUEST_OPTIONS)
            .pipe(
                tap(value => console.log('-------->', value)),
                catchError(error => {
                    console.error('Can not set playermode: ', error);
                    return EMPTY;
                })
            );
    }

    public getPlayerMode(gamekey: string, playerid: number): Observable<boolean> {
        return this.httpClient.get<boolean>(`${BASE_URL}/players/getplayermode/${gamekey}/${playerid}`, BASE_GET_REQUEST_OPTIONS)
            .pipe(
                tap(value => console.log('-------->', value)),
                catchError(error => {
                    console.error('Can not get playermode: ', error);
                    return EMPTY;
                })
            );
    }

    public getAverage(gamekey: string): Observable<number> {
        return this.httpClient.get<number>(`${BASE_URL}/average/${gamekey}`, BASE_GET_REQUEST_OPTIONS)
            .pipe(
                tap(value => console.log('-------->', value)),
                catchError(error => {
                    console.error('Can not get average: ', error);
                    return EMPTY;
                })
            );
    }

    offboarding(gamekey: string, playerid: number, isTablemaster: object) {
        return this.httpClient.get(`${BASE_URL}/tables/offboarding/${gamekey}/${playerid}/${isTablemaster}`, BASE_GET_REQUEST_OPTIONS)
            .pipe(
                tap(value => console.log('-------->', value)),
                catchError(error => {
                    console.error('Can not offboard player: ', error);
                    return EMPTY;
                })
            );
    }

    kickplayer(gamekey: string, playerid: number) {
        return this.httpClient.get(`${BASE_URL}/tables/kickplayer/${gamekey}/${playerid}`, BASE_GET_REQUEST_OPTIONS)
            .pipe(
                tap(value => console.log('-------->', value)),
                catchError(error => {
                    console.error('Can not kick player: ', error);
                    return EMPTY;
                })
            );
    }

    public gameover(gamekey: string) {
        this.isGameRunning = false;
        return this.httpClient.get(`${BASE_URL}/tables/gameover/${gamekey}`, BASE_GET_REQUEST_OPTIONS)
            .pipe(
                tap(value => console.log('-------->', value)),
                catchError(error => {
                    console.error('Can not end game: ', error);
                    return EMPTY;
                })
            );
    }

    public gamestart(gamekey: string) {
        this.isGameRunning = true;
        return this.httpClient.get(`${BASE_URL}/tables/gameStart/${gamekey}`, BASE_GET_REQUEST_OPTIONS)
            .pipe(
                tap(value => console.log('-------->', value)),
                catchError(error => {
                    console.error('Can not start game: ', error);
                    return EMPTY;
                })
            );
    }

    public getPlayers(gamekey: string) {
          return this.httpClient.get<Player[]>(`${BASE_URL}/tables/getplayers/${gamekey}`, BASE_GET_REQUEST_OPTIONS).pipe(
                tap(players => {
                    this.players = players;
                }),
                  catchError(error => {
                      console.error('Can not get players: ', error);
                      return EMPTY;
                  })
          );
    }

    public getRoundName(gamekey: string) {
        return this.httpClient.get<RoundInfoModel>(`${BASE_URL}/tables/getroundname/${gamekey}`, BASE_GET_REQUEST_OPTIONS).pipe(
            tap(value => console.log('-------->', value)),
            map(data => {
                return {
                    roundInfo: data.roundInfo,
                    roundInfoLink: data.roundInfoLink
                } as RoundInfoModel;
            }),
            catchError(error => {
                console.error('Can not get roundname: ', error);
                return EMPTY;
            })
        );
    }

    public setRoundName(gamekey: string, roundname: string): Observable<RoundInfoModel> {
        return this.httpClient.get<RoundInfoModel>(`${BASE_URL}/tables/setroundname/${gamekey}/${roundname}`, BASE_GET_REQUEST_OPTIONS).pipe(
            tap(value => console.log('-------->', value)),
            catchError(error => {
                console.error('Can not set roundname: ', error);
                return EMPTY;
            })
        );
    }

    //Card Service
    public getCardSvg(cardName: string): Observable<string> {
      return this.httpClient.get(`../assets/images/${cardName}`, {responseType: 'text'});
    }


}
