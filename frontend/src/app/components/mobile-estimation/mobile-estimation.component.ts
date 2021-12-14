import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';
import { BackendMessengerService } from '../../services/backend-messenger.service';
import { Observable } from 'rxjs';
import { Game } from '../../models/model';

@Component({
  selector: 'app-mobile-estimation',
  templateUrl: './mobile-estimation.component.html',
  styleUrls: ['./mobile-estimation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileEstimationComponent implements OnInit {

  game$: Observable<Game> = this.pokerService.game$.asObservable();

  constructor(
    private readonly pokerService: PokerGameService,
    private readonly messenger: BackendMessengerService
  ) {
  }

  ngOnInit(): void {
    this.messenger.subscribe((message) => {
      if (message.includes('gameStart') || message.includes('gameOver')) {
        this.refresh();
      }
    });

    this.refresh();
  }

  public setSelectedCard(selectedValue: string) {
    this.pokerService.setSelectedCard(this.pokerService.game$.value.gameKey, this.pokerService.game$.value.me!.id, selectedValue).subscribe();
  }


  public refresh() {
    this.pokerService.getRoundName(this.pokerService.game$.value.gameKey).subscribe();
  }
}
