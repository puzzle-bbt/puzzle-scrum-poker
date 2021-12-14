import { Component, OnInit } from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(public pokerGameService: PokerGameService) { }

  ngOnInit(): void {
  }

}
