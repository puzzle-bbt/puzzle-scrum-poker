import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Game} from "../../models/model";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundComponent implements OnInit {

  displayButton$: Observable<boolean> = this.pokerGameService.game$.pipe(
    map(game => game.iAmTableMaster)
  );

  game$: BehaviorSubject<Game> = this.pokerGameService.game$;

  constructor(public readonly pokerGameService: PokerGameService,
  ) {}

  ngOnInit(): void {
    if (this.game$.value.me == undefined && !this.game$.value.gameKey) {
      window.location.href = "http://" + window.location.host + "/onboarding";
    }
  }

  public changeGameState() {
    this.pokerGameService.toggleGameRunning().subscribe();
  }

}
