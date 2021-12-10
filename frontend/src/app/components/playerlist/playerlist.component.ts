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
        if (this.cacheService.isTablemaster) {
            this.isTablemaster = true;
        }
        else {
            this.isTablemaster = false;
        }
        this.gamekey = this.cacheService.gamekey!;
        this.playerid = this.cacheService.id!;
        this.messenger.subscribe((message) => {
            if (message.includes("RefreshPlayer")) {
                this.refresh();
            }
        });
        this.messenger.subscribe((message) => {
            if (message.includes("gameOver")) {
                this.refresh();
            }
        });
        this.messenger.subscribe((message) => {
            if (message.includes("gameStart")) {
                this.refresh();
            }
        });
        this.refresh();
    }

    public refresh() {
        this.isGameRunning = this.pokerService.isGameRunning;
        this.pokerService.getPlayers(this.gamekey!).subscribe(
            (players: Player[]) => {
                this.players = players;
            }
        )
    }

    public kickplayer(playerId: number) {
        this.pokerService.kickplayer(this.gamekey!, playerId).subscribe(
            () => {
            }
        );
    }

    public copyLink() {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = window.location.host + "/onboarding/" + this.gamekey;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
