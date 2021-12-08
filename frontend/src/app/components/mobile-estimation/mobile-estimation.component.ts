import { Component, OnInit } from '@angular/core';
import {PokerGameService} from "../../services/poker-game.service";

@Component({
  selector: 'app-mobile-estimation',
  templateUrl: './mobile-estimation.component.html',
  styleUrls: ['./mobile-estimation.component.scss']
})
export class MobileEstimationComponent implements OnInit {

  constructor(private pokerService: PokerGameService) { }

  ngOnInit(): void {
  }

    public setSelectedCard(selectedValue:string) {
        this.pokerService.setSelectedCard(this.pokerService.gamekey!, this.pokerService.id!, selectedValue).subscribe();
    }

}
