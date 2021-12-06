import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {PokerGameService} from "../../services/poker-game.service";

@Component({
  selector: 'app-mobile-estimation',
  templateUrl: './mobile-estimation.component.html',
  styleUrls: ['./mobile-estimation.component.scss']
})
export class MobileEstimationComponent implements OnInit {

    gamekey?: string;
    playerid?: number;

  constructor(private cacheService: CacheService, private pokerService: PokerGameService) { }

  ngOnInit(): void {
      this.gamekey = this.cacheService.gamekey!;
      this.playerid = this.cacheService.id!;
  }

    public setSelectedCard(selectedValue:string) {
        this.pokerService.setSelectedCard(this.gamekey!, this.playerid!, selectedValue).subscribe(
            () => {

            }
        );
    }

}
