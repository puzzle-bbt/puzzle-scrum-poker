import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Game} from "../../models/model";
import {BackendMessengerService} from "../../services/backend-messenger.service";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundComponent implements OnInit {

  notClickable: boolean | undefined;

  displayButton$: Observable<boolean> = this.pokerGameService.game$.pipe(
    map(game => game.iAmTableMaster)
  );

  game$: BehaviorSubject<Game> = this.pokerGameService.game$;

  constructor(public readonly pokerGameService: PokerGameService,
              public readonly messenger: BackendMessengerService
  ) {}

  ngOnInit(): void {
    this.notClickable = false;
    this.messenger.subscribe((message) => {
      if (message.includes('gameStart')) {
        this.notClickable = false;
      }
      if (message.includes('gameOver')) {
        this.notClickable = false;
      }
    });

    if (!this.game$.value.gameKey) {
      window.location.href = window.location.protocol + "//" + window.location.host + "/onboarding";
    }
  }

  public changeGameState() {
    this.notClickable = true;
    this.pokerGameService.toggleGameRunning().subscribe();
  }

}
