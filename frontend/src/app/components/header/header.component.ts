import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {PokerGameService} from "../../services/poker-game.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isPlaying?: boolean = true;

    constructor(private cacheService: CacheService, private pokerGameService: PokerGameService) {
    }

    ngOnInit(): void {
    }

    public changeSpectator() {
        if (this.isPlaying) {
            this.pokerGameService.setPlayerMode(this.cacheService.gamekey!, this.cacheService.id!, false).subscribe();
            this.isPlaying = false;
        }
        else {
            this.pokerGameService.setPlayerMode(this.cacheService.gamekey!, this.cacheService.id!, true).subscribe();
            this.isPlaying = true;
        }
    }

    public isCurrentlyOnPlayground() {
        let url = window.location.toString();
        if (url.includes("playground")) {
            return true;
        } else {
            return false;
        }
    }
}
