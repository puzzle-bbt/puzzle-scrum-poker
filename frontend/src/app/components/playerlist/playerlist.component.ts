import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';
import { BackendMessengerService } from '../../services/backend-messenger.service';
import { BehaviorSubject } from 'rxjs';
import { Game, Player } from '../../models/model';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit {

  game$: BehaviorSubject<Game> = this.pokerService.game$;
  players$: BehaviorSubject<Player[]> = this.pokerService.players$;

  constructor(
    private readonly pokerService: PokerGameService,
    private readonly messenger: BackendMessengerService) {
  }

  ngOnInit(): void {
    this.messenger.subscribe((message) => {
      if (message.includes('RefreshPlayer')) {
        this.refresh();
      }
    });
    this.messenger.subscribe((message) => {
      if (message.includes('gameOver')) {
        this.refresh();
      }
    });
    this.messenger.subscribe((message) => {
      if (message.includes('gameStart')) {
        this.refresh();
      }
    });
    this.refresh();

  }

  public refresh() {
    this.pokerService.getPlayers().subscribe();
  }

  public kickPlayer(playerId: number) {
    this.pokerService.kickplayer(this.pokerService.game$.value.gameKey, playerId).subscribe(
      () => {
      }
    );
  }

  public copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.host + '/onboarding/' + this.pokerService.game$.value.gameKey;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  public isOnDesktop() {
    if (window.innerWidth > 768) {
      return true;
    } else {
      return false;
    }
  }

}
