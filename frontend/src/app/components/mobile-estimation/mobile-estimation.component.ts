import { Component, OnInit } from '@angular/core';
import {PokerGameService} from "../../services/poker-game.service";

@Component({
  selector: 'app-mobile-estimation',
  templateUrl: './mobile-estimation.component.html',
  styleUrls: ['./mobile-estimation.component.scss']
})
export class MobileEstimationComponent implements OnInit {

    gamekey?: string;
    playerid?: number;

  constructor(private pokerService: PokerGameService) { }

  ngOnInit(): void {
      this.gamekey = this.pokerService.gamekey!;
      this.playerid = this.pokerService.id!;
  }

    public setSelectedCard(selectedValue:string) {
        this.pokerService.setSelectedCard(this.gamekey!, this.playerid!, selectedValue).subscribe();
    }

}
