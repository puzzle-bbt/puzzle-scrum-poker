import { Component } from '@angular/core';
import { CacheService } from './services/cache.service';
import { PokerGameService } from './services/poker-game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  isPlaying?: boolean = true;

  constructor(
    private cacheService: CacheService,
    private pokerGameService: PokerGameService
    ) {
  }

  public changeSpectator() {
    if (this.isPlaying) {
      this.pokerGameService.setPlayerMode(this.cacheService.gamekey!, this.cacheService.id!, false).subscribe();
      this.isPlaying = false;
    } else {
      this.pokerGameService.setPlayerMode(this.cacheService.gamekey!, this.cacheService.id!, true).subscribe();
      this.isPlaying = true;
    }
  }

  public isCurrentlyOnPlayground() {
    let url = window.location.toString();
    return url.includes('playground');
  }
}
