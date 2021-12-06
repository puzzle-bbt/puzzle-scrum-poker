import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {PokerGameService} from "../../services/poker-game.service";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

    displayButton: boolean | null = this.cacheService.isTablemaster;

  constructor(private cacheService: CacheService, private pokerGameService: PokerGameService) { }

  ngOnInit(): void {
  }

  public changeGameState() {
      if (this.pokerGameService.isGameRunning) {
          this.pokerGameService.gameover(this.cacheService.gamekey!).subscribe();
      }
      else {
          this.pokerGameService.gamestart(this.cacheService.gamekey!).subscribe();
      }
  }

}
