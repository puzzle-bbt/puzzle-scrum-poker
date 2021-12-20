import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundComponent {

  displayButton$: Observable<boolean> = this.pokerGameService.game$.pipe(
    map(game => game.iAmTableMaster)
  );

  constructor(public readonly pokerGameService: PokerGameService) {
  }

  public changeGameState() {
    this.pokerGameService.toggleGameRunning().subscribe();
  }
}
