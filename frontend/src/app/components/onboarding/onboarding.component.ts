import { Component, OnInit } from '@angular/core';
import {PokerGameService} from "../../services/poker-game.service";
import {Observable, tap} from "rxjs";
import {PlayerModel} from "../../models/model";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendMessengerService} from "../../services/backend-messenger.service";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})

export class OnboardingComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private messenger: BackendMessengerService, private pokerService: PokerGameService) { }

    ngOnInit(): void {
      const gamekey = this.route.snapshot.paramMap.get('gamekey');
      if (gamekey == null) {
          this.pokerService.isTablemaster = true;
      }
      else {
          this.pokerService.isTablemaster  = false;
          this.pokerService.gamekey = gamekey;
      }
    }

    public create(username: string) {
        if(this.pokerService.isTablemaster) {
            this.createTablemaster(username);
        } else {
            this.createPlayer(username);
        }
    }

    public createTablemaster(tablemasterName: string) {
        this.pokerService.createTablemaster(tablemasterName).subscribe(successful => {
          if (successful) {
            this.messenger.sendMessage(`table=${this.pokerService.gamekey},playerid=${this.pokerService.id}`);
            this.router.navigateByUrl("/playground");
          } else {
            // TODO: show a error message
          }
        });
    }

    public createPlayer(playerName: string) {
        this.pokerService.createPlayer(playerName, this.pokerService.gamekey!)
            .pipe(
                tap((value: PlayerModel) => {
                    this.pokerService.id = +value.id;
                    this.messenger.sendMessage(`table=${this.pokerService.gamekey},playerid=${this.pokerService.id}`);
                    this.router.navigateByUrl("/playground");
                })
            ).subscribe();
    }
}
