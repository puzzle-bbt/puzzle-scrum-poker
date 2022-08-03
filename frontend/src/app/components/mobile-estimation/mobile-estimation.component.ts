import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PokerGameService} from '../../services/poker-game.service';
import {BackendMessengerService} from '../../services/backend-messenger.service';
import {Observable} from 'rxjs';
import {Game} from '../../models/model';
import {ScreenSizeService} from "../../services/screen-size.service";


@Component({
  selector: 'app-mobile-estimation',
  templateUrl: './mobile-estimation.component.html',
  styleUrls: ['./mobile-estimation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileEstimationComponent implements OnInit {
  game$: Observable<Game> = this.pokerService.game$.asObservable();

  cardSelected?: boolean;
  selectionValue: string = "";

  constructor(
    public pokerService: PokerGameService,
    private readonly messenger: BackendMessengerService,
    private _cardValueService: ScreenSizeService
  ) {
    this._cardValueService.getSize().subscribe((width) => {
      if (!this._cardValueService.isDesktopSize(width)) {
        this.selectionValue = this._cardValueService.currentCardValue;
      }
    })
  }

  ngOnInit(): void {
    this.cardSelected = false;
    this.messenger.subscribe((message) => {
      if (message.includes('gameStart') || message.includes('gameOver')) {
        this.refresh();
        this.getAverage();
      }
    });

    this.refresh();
  }

  public setSelectedCard() {
    this.cardSelected = true;
    this.pokerService.setSelectedCard(this.pokerService.game$.value.gameKey, this.pokerService.game$.value.me!.id, this.selectionValue).subscribe();
    this._cardValueService.currentCardValue = this.selectionValue;
    console.log(this._cardValueService.currentCardValue)
  }

  public refresh() {
    this.cardSelected = false;
    this.pokerService.getRoundName(this.pokerService.game$.value.gameKey).subscribe();
  }

  public getAverage() {
    this.pokerService.getAverage(this.pokerService.game$.value.gameKey).subscribe();
  }
}
