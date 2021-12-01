import {Component, OnInit} from '@angular/core';
import {Player} from "../../player";
import {PokerGameService} from "../../poker-game.service";

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss']
})


export class PlayerListComponent {

    players: Player[] = [];
    gamekey?: string;
    isGameRunning?: boolean;
    average?: number;


    constructor(
        private httpService: PokerGameService) {
    }


    public refresh() {
        this.gamekey = this.httpService.gamekey;
        this.isGameRunning = this.httpService.isGameRunning;
        this.httpService.getPlayers(this.gamekey).subscribe(
            (players) => {
                this.players = players;
            }
        )
        this.httpService.getAverage(this.gamekey).subscribe(
            (average) => {
                this.average = average;
            }
        )
    }

    public kickplayer(playerId: number) {
        this.httpService.kickplayer(this.gamekey!, playerId).subscribe(
            () => {
            }
        );
    }
}
