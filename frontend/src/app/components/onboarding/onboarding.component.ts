import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PokerGameService} from '../../services/poker-game.service';
import {ActivatedRoute} from '@angular/router';
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {Player} from "../../models/model";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingComponent implements OnInit {

  clicked: boolean = false;
  // players$: BehaviorSubject<Player[]> = this.pokerService.players$;
  players: Player[] = []
  username: string = "";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pokerService: PokerGameService,
    public readonly messenger: BackendMessengerService
  ) {
  }

  ngOnInit(): void {
    const gameKey = this.route.snapshot.paramMap.get('gamekey');
    if (gameKey == null) {
      this.pokerService.setAsTableMaster();
    } else {
      this.pokerService.setGameKey(gameKey);
      this.pokerService.getPlayersAsync().subscribe((data) => {
        this.players = data
      });
    }

    this.messenger.subscribe((message) => {
      if (message.includes('RefreshPlayer')) {
        this.pokerService.getPlayersAsync().subscribe((data) => {
          this.players = data
        });
      }
    });
  }

  public create(username: string): void {
    this.clicked = true;
    if (this.pokerService.game$.value.iAmTableMaster) {
      this.createTablemaster(username);
    } else {
      this.createPlayer(username);
    }
  }

  public createTablemaster(tablemasterName: string): void {
    this.pokerService.createTablemaster(tablemasterName).subscribe();
  }

  public createPlayer(playerName: string): void {
    this.pokerService.createPlayer(playerName).subscribe();
  }

  public usernameContainsSpecialChars(username: string): boolean {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return !username || format.test(username);
  }

  public checkUsernameExists(username: string): boolean {
    return this.players.map(e => e.name).includes(username);
  }

  checkUsername(username: string): null | string {
    const MAX_CHARS = 25;
    if (this.clicked) {
      return "";
    }
    if(username.trim().length == 0){
      return "Benutzername darf nicht leer sein"
    }
    if(username.length > MAX_CHARS){
      return `Benutzername darf maximal ${MAX_CHARS} Zeichen enthalten`
    }
    if (this.usernameContainsSpecialChars(username)) {
      return "Verwende keinen leeren Namen oder auch keine Sonderzeichen.";
    }
    if (this.checkUsernameExists(username)) {
      return "Benutzername wird bereits verwendet";
    }
    return null;
  }
}

