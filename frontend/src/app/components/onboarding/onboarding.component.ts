import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PokerGameService} from '../../services/poker-game.service';
import {ActivatedRoute} from '@angular/router';
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {BehaviorSubject} from "rxjs";
import {Player} from "../../models/model";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingComponent implements OnInit {

  clicked: boolean | undefined;
  players$: BehaviorSubject<Player[]> = this.pokerService.players$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pokerService: PokerGameService,
    public readonly messenger: BackendMessengerService
  ) {
  }

  ngOnInit(): void {
    this.clicked = false;
    const gameKey = this.route.snapshot.paramMap.get('gamekey');
    if (gameKey == null) {
      this.pokerService.setAsTableMaster();
    } else {
      this.pokerService.setGameKey(gameKey);
      this.pokerService.getPlayers().subscribe();
    }

    this.messenger.subscribe((message) => {
      if (message.includes('RefreshPlayer')) {
        this.pokerService.getPlayers().subscribe()
      }
    });
  }

  public create(username: string) {
    this.clicked = true;
    if (this.checkUsernameSpecialChars(username)) {
      alert("Verwende keinen leeren Namen oder auch keine Sonderzeichen.");
      window.location.reload();
      return;
    }
    if (this.checkUsernameExists(username)) {
      alert("Benutzername wird bereits verwendet");
      window.location.reload();
      return;
    }

    if (this.pokerService.game$.value.iAmTableMaster) {
      this.createTablemaster(username);
    } else {
      this.createPlayer(username);
    }
  }

  public createTablemaster(tablemasterName: string) {
    this.pokerService.createTablemaster(tablemasterName).subscribe();
  }

  public createPlayer(playerName: string) {
    this.pokerService.createPlayer(playerName).subscribe();
  }

  public checkUsernameSpecialChars(username: string): boolean {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return !username || format.test(username) || username.trim().length == 0 || username.length > 25;
  }

  public checkUsernameExists(username: string) {
    return this.players$.getValue().map(e => e.name).includes(username);
  }
}

