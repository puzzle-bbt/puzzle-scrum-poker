import {Component, HostListener, OnInit} from '@angular/core';
import { PokerGameService } from './services/poker-game.service';
import {ScreenSizeService} from "./services/screen-size.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isPlaying?: boolean = true;

  constructor(
    private pokerService: PokerGameService, private _screenSizeService:ScreenSizeService
  ) {
    this._screenSizeService.setSize(window.innerWidth);
  }

  ngOnInit(): void {
    this._screenSizeService.setSize(window.innerWidth);
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

  @HostListener('window:resize', ['$event']) onResize() {
    this._screenSizeService.setSize(window.innerWidth);
  }
}
