import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Player} from "./player";

@Injectable({
  providedIn: 'root'
})
export class PokerService {

    readonly createTablemasterURL = "http://localhost:8080/createTablemaster/";
    readonly createPlayerURL = "http://localhost:8080/createPlayer/";
    readonly setSelectedCardURL = "http://localhost:8080/players/setselectedcard/";
    readonly setPlayerModeURL = "http://localhost:8080/players/setplayermode/";
    readonly getPlayerModeURL = "http://localhost:8080/players/getplayermode/";
    readonly averageURL = "http://localhost:8080/average/";
    readonly offboadingURL = "http://localhost:8080/tables/offboarding/";
    readonly kickPlayerURL = "http://localhost:8080/tables/kickplayer/";
    readonly getPlayerURL = "http://localhost:8080/tables/getplayers/";

    constructor(private httpClient: HttpClient) { }


    createTablemaster(tablemasterName: string, tablename: string) {
       return this.httpClient.get(this.createTablemasterURL + tablemasterName + "/" + tablename, {responseType: 'text'});
    }

    createPlayer(gamekey: string, playername: string) {
        return this.httpClient.get<number>(this.createPlayerURL + playername + "/" + gamekey, {responseType: 'json'});
    }

    setSelectedCard(gamekey: string, playerid: number, selectedCard: string) {
       return this.httpClient.get(this.setSelectedCardURL + gamekey + "/" + playerid + "/" + selectedCard);
    }

    setPlayerMode(gamekey: string, playerid: number, isPlaying: boolean) {
       return this.httpClient.get(this.setPlayerModeURL + gamekey + "/" + playerid + "/" + isPlaying);
    }

    getPlayerMode(gamekey: string, playerid: number) {
       return this.httpClient.get(this.getPlayerModeURL + gamekey + "/" + playerid + "/");
    }

    getAverage(gamekey: string) {
       return this.httpClient.get<number>(this.averageURL + gamekey, {responseType: 'json'});
    }

    offboarding(gamekey: string, playerid: number, isTablemaster: object) {
       return this.httpClient.get(this.offboadingURL + gamekey + "/" + playerid + "/" + isTablemaster);
    }

    kickplayer(gamekey: string, playerid: number) {
        console.log(this.kickPlayerURL + gamekey + "/" + playerid);
       return this.httpClient.get(this.kickPlayerURL + gamekey + "/" + playerid);
    }

    getPlayers(gamekey: string) {
        return this.httpClient.get<Player[]>(this.getPlayerURL + gamekey, {responseType: 'json'});
    }
}
