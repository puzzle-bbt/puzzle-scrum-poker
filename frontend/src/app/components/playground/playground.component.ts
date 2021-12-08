import { Component, OnInit } from '@angular/core';
import {PokerGameService} from "../../services/poker-game.service";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

    displayButton: boolean | null = this.pokerGameService.isTablemaster;

  constructor(private pokerGameService: PokerGameService) { }

  ngOnInit(): void {
  }

  public changeGameState() {
      if (this.pokerGameService.isGameRunning) {
          this.pokerGameService.gameover(this.pokerGameService.gamekey!).subscribe();
      }
      else {
          this.pokerGameService.gamestart(this.pokerGameService.gamekey!).subscribe();
      }
  }

}
