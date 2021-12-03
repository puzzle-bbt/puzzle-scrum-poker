import {Component, OnInit} from '@angular/core';
import {Player} from "../../player";
import {PokerGameService} from "../../services/poker-game.service";
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss']
})


export class PlayerListComponent implements OnInit{

    players: Player[] = [];
    gamekey?: string;
    isGameRunning?: boolean;
    average?: number;
    playerid?: number;

    isTablemaster?: boolean;

    cssClasses?: string;


    constructor(
        private pokerService: PokerGameService, private messenger: BackendMessengerService, private cacheService: CacheService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.messenger.subscribe((message) => {
            if (message.includes("RefreshPlayer")) {
                this.refresh();
            }
        });
        if (this.cacheService.isTablemaster) {
            this.isTablemaster = true;
        }
        else {
            this.isTablemaster = false;
        }
    }

    public refresh() {
        this.gamekey = this.cacheService.gamekey!;
        this.isGameRunning = this.pokerService.isGameRunning;
        this.playerid = this.cacheService.id!;
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
