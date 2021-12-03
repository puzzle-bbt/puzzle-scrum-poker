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
            this.pokerGameService.setPlayerMode(this.cacheService.gamekey!, this.cacheService.id!, false);
            this.isPlaying = false;
        }
        else {
            this.pokerGameService.setPlayerMode(this.cacheService.gamekey!, this.cacheService.id!, true);
            this.isPlaying = true;
        }
    }

}
