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

  clicked : boolean = false;
  // players$: BehaviorSubject<Player[]> = this.pokerService.players$;
  players:Player[]=[]
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
      this.pokerService.getPlayersAsync().subscribe((data)=>{
        this.players = data
      });
    }

    this.messenger.subscribe((message) => {
      if (message.includes('RefreshPlayer')) {
        this.pokerService.getPlayersAsync().subscribe((data)=>{
          this.players = data
        });
      }
    });
  }

  public create(username: string) {
    this.clicked = true;
    console.log('-->', this.pokerService.game$.value);
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
    return this.players.map(e => e.name).includes(username);
  }

  checkUsername(username: string) {
    if(this.clicked){
      return true;
    }
    if (username != '' && this.checkUsernameSpecialChars(username)) {
      return "Verwende keinen leeren Namen oder auch keine Sonderzeichen.";
    }
    if (username != '' && this.checkUsernameExists(username)) {
      return "Benutzername wird bereits verwendet";
    }
    return null;
  }
}

