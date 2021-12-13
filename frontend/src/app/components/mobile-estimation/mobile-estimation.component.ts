import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PokerGameService} from "../../services/poker-game.service";
import {BackendMessengerService} from "../../services/backend-messenger.service";

@Component({
  selector: 'app-mobile-estimation',
  templateUrl: './mobile-estimation.component.html',
  styleUrls: ['./mobile-estimation.component.scss'],
})
export class MobileEstimationComponent implements OnInit {

  isGameRunning?: boolean;
  roundName?: string;

  constructor(private pokerService: PokerGameService, private messenger: BackendMessengerService) { }

    ngOnInit(): void {
      this.messenger.subscribe((message) => {
        if (message.includes("gameStart") || message.includes("gameOver")) {
          this.refresh();
        }
        });

      this.refresh();
    }

    public setSelectedCard(selectedValue:string) {
        this.pokerService.setSelectedCard(this.pokerService.gamekey!, this.pokerService.id!, selectedValue).subscribe();
    }


  public refresh() {
    this.isGameRunning = this.pokerService.isGameRunning;
    this.pokerService.getRoundName(this.pokerService.gamekey).subscribe(roundInfo =>
      {
        this.roundName = roundInfo.roundInfo;
      }
    );
    console.log(this.roundName);
  }
}