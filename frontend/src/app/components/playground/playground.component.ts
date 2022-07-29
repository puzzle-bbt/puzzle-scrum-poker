import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {PokerGameService} from '../../services/poker-game.service';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Game, Player} from "../../models/model";
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {ScreenSizeService} from "../../services/screen-size.service";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundComponent implements OnInit {
  notClickable: boolean | undefined;
  displayButton$: Observable<boolean> = this.pokerGameService.game$.pipe(map(game => game.iAmTableMaster));
  innerWidth = 0;
  game$: BehaviorSubject<Game> = this.pokerGameService.game$;
  players$: BehaviorSubject<Player[]> = this.pokerGameService.players$;


  constructor(public readonly pokerGameService: PokerGameService, public readonly messenger: BackendMessengerService, public screenSizeService: ScreenSizeService) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.notClickable = false;
    this.messenger.subscribe((message) => {
      if (message.includes('gameStart') || message.includes('gameOver')) {
        this.notClickable = false;
      }

      if (message.includes('RefreshPlayer')) {
        this.pokerGameService.getPlayers().subscribe(() => {
          let playingPlayersCount = this.players$.getValue().filter(e => e.playing).length;
          this.notClickable = playingPlayersCount === 0;
        });
      }
    });

    if (!this.game$.value.gameKey) {
      window.location.href = window.location.protocol + "//" + window.location.host + "/onboarding";
    }
  }

  changeGameState() {
    this.notClickable = true;
    this.pokerGameService.toggleGameRunning().subscribe();
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.innerWidth = window.innerWidth;
  }
}
