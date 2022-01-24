import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingComponent implements OnInit {

  clicked : boolean | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pokerService: PokerGameService
  ) {
  }

  ngOnInit(): void {
    this.clicked = false;
    const gameKey = this.route.snapshot.paramMap.get('gamekey');
    if (gameKey == null) {
      this.pokerService.setAsTableMaster();
    } else {
      this.pokerService.setGameKey(gameKey);
    }
  }

  public create(username: string) {
    this.clicked = true;
    if (this.checkUsername(username)) {
      console.log('-->', this.pokerService.game$.value);
      if (this.pokerService.game$.value.iAmTableMaster) {
        this.createTablemaster(username);
      } else {
        this.createPlayer(username);
      }
    }
    else {
      alert("Verwende keinen leeren Namen oder auch keine Sonderzeichen.");
      window.location.reload();
    }
  }

  public createTablemaster(tablemasterName: string) {
    this.pokerService.createTablemaster(tablemasterName).subscribe();
  }

  public createPlayer(playerName: string) {
    this.pokerService.createPlayer(playerName).subscribe();
  }

  public checkUsername(username: string): boolean {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!username || format.test(username) || username.trim().length == 0 || username.length > 25) {
      return false;
    } else {
      return true;
    }
  }
}
