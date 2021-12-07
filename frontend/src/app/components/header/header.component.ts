import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {PokerGameService} from "../../services/poker-game.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isPlaying?: boolean = true;
    url?: string;

    constructor(private cacheService: CacheService, private pokerGameService: PokerGameService, private router: Router) {
    }

    ngOnInit(): void {
        this.url = window.location.toString();
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
        return this.url!.includes("playground");
    }

    public navigateToInfo() {
        this.router.navigate([window.location.pathname + "/info"]);
        console.log(window.location.pathname + "/info");
    }
}
