import {Component} from '@angular/core';
import {PokerGameService} from './services/poker-game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  isPlaying?: boolean = true;

  constructor(
    private pokerService: PokerGameService) {
  }


  public changeSpectator() {
    if (this.isPlaying) {
      this.pokerService.setPlayerMode(this.pokerService.game$.value.gameKey, this.pokerService.game$.value.me!.id, false).subscribe();
      this.isPlaying = false;
    } else {
      this.pokerService.setPlayerMode(this.pokerService.game$.value.gameKey, this.pokerService.game$.value.me!.id, true).subscribe();
      this.isPlaying = true;
    }
  }

  public isCurrentlyOnPlayground() {
    let url = window.location.toString();
    return url.includes('playground');
  }


}
