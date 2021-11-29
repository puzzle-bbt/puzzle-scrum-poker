import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../http.service";
import {WebsocketService} from "../../websocket.service";
import {Player} from "../../player";

@Component({
  selector: 'app-gamecontrol',
  templateUrl: './gamecontrol.component.html',
  styleUrls: ['./gamecontrol.component.scss']
})
export class GamecontrolComponent implements OnInit, OnDestroy {

    gamekey?: string;
    tablemasterId?: string;
    newPlayerId?: number;
    players?: Player[];
    average?: number;

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
                this.tablemasterId = contents[1];
            });
    }

    public createPlayer(playerName: string) {
        this.httpService.createPlayer(this.gamekey!, playerName).subscribe(
            (playerId) => {
                this.newPlayerId = playerId;
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

    public sendWSMessage(msg: string) {
        this.websocketService.sendWSMessage(msg);
    }
}
