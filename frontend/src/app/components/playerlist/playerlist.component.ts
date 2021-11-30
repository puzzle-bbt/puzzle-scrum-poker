import {Component, OnInit} from '@angular/core';
import {Player} from "../../player";
import {HttpService} from "../../http.service";
import {WebsocketService} from "../../websocket.service";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss']
})


export class PlayerListComponent implements OnInit {

    tablemasterId?: number;
    playerId?: number;
    players: Player[] = [];
    gamekey?: string;
    playerMode?: Object;
    average?: number;
    isGameRunning?: boolean;


    constructor(
        private httpService: HttpService,
        private websocketService: WebsocketService) { }

    ngOnInit(): void {
        this.websocketService.openWSConnection(
            () => {}
        );
    }

    ngOnDestroy(): void {
        this.websocketService.closeWSConnection();
    }


    public createTablemaster(tablemasterName: string) {
        this.httpService.createTablemaster(tablemasterName).subscribe(
            (text) => {
                let contents = text.split(',');
                this.gamekey = contents[0];
                this .tablemasterId = +contents[1];
            });
    }


    public createPlayer(playerName: string) {
        this.httpService.createPlayer(this.gamekey!, playerName).subscribe(
            (playerId) => {
                this.playerId = playerId;
                //this.sendWSMessage(('table=' + this.gamekey + ',' + 'playerid=' + this.playerId));
            }
        );
    }

    public setSelectedCard(playerId: string, selectedCard: string) {
        this.httpService.setSelectedCard(this.gamekey!, +playerId, selectedCard).subscribe(
            (selectedCard) => {}
        );
    }

    public setPlayerMode(playerId: string, playerMode: boolean) {
        this.httpService.setPlayerMode(this.gamekey!, +playerId, playerMode).subscribe(
            () => {}
        );
    }

    public getAverage() {
        this.httpService.getAverage(this.gamekey!).subscribe(
            (average) => {
                this.average = average;
            }
        );
    }

    public getPlayers() {
        this.httpService.getPlayers(this.gamekey!).subscribe(
            (players) => {
                this.players = players;
            }
        );
    }

    public gameover() {
        this.httpService.gameover(this.gamekey!).subscribe(
            () => {
                this.isGameRunning = false;
                this.getAverage();
            }
        );
    }

    public gamestart() {
        this.httpService.gamestart(this.gamekey!).subscribe(
            () => {
                this.isGameRunning = true;
            }
        );
    }

    public kickplayer(playerId: number) {
        this.httpService.kickplayer(this.gamekey!, playerId).subscribe(
            () => {
            }
        );
    }

    public sendWSMessage(msg: string) {
        this.websocketService.sendWSMessage(msg);
    }


}
