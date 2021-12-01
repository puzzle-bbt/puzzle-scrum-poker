import {Component, OnInit} from '@angular/core';
import {Player} from "../../player";
import {PokerGameService} from "../../services/poker-game.service";

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
        private pokerService: PokerGameService) {
    }


    public refresh() {
        this.gamekey = this.pokerService.gamekey;
        this.isGameRunning = this.pokerService.isGameRunning;
        this.pokerService.getPlayers(this.gamekey).subscribe(
            (players: Player[]) => {
                this.players = players;
            }
        )
        this.pokerService.getAverage(this.gamekey).subscribe(
            (average: number) => {
                this.average = average;
            }
        )
    }

    public kickplayer(playerId: number) {
        this.pokerService.kickplayer(this.gamekey!, playerId).subscribe(
            () => {
            }
        );
    }
}
