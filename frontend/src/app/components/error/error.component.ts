import { Component, OnInit } from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';
import {BehaviorSubject} from "rxjs";
import {Game} from "../../models/model";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  game$: BehaviorSubject<Game> = this.pokerGameService.game$;

  constructor(public pokerGameService: PokerGameService) {
  }

  ngOnInit(): void {
    if (!this.game$.value.gameKey) {
      window.location.href = window.location.protocol + "//" + window.location.host + "/onboarding";
    }
  }

}
