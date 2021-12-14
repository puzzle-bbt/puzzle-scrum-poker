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

    constructor(
      private readonly route: ActivatedRoute,
      private readonly pokerService: PokerGameService
    ) { }

    ngOnInit(): void {
      const gameKey = this.route.snapshot.paramMap.get('gamekey');
      if (gameKey == null) {
        this.pokerService.setAsTableMaster();
      } else {
        this.pokerService.setGameKey(gameKey);
      }
    }

    public create(username: string) {
        if(this.pokerService.game$.value.iAmTableMaster) {
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
}
