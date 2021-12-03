import { Component, OnInit } from '@angular/core';
import {PokerGameService} from "../../services/poker-game.service";
import {Observable, tap} from "rxjs";
import {PlayerModel} from "../../models/model";
import {ExampleService} from "../../services/example-service";
import {ActivatedRoute} from "@angular/router";
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})

export class OnboardingComponent implements OnInit {

    constructor(private route: ActivatedRoute,  private exampleService: ExampleService, private cacheService: CacheService) { }

    ngOnInit(): void {
      const gamekey = this.route.snapshot.paramMap.get('gamekey');
      if (gamekey == null) {
          this.cacheService.isTablemaster = true;
      }
      else {
          this.cacheService.isTablemaster  = false;
          this.cacheService.gamekey = gamekey;
      }
    }

    public checkForTablemaster(username: string) {
        if(this.cacheService.isTablemaster) {
            this.createTablemaster(username);
        } else {
            this.createPlayer(username);
        }
    }

    public createTablemaster(tablemasterName: string) {
        this.exampleService.createTablemaster(tablemasterName)
            .pipe(
                tap((value: PlayerModel) => {
                    this.cacheService.id = +value.id;
                    this.cacheService.gamekey = value.gameKey!;
                })
            ).subscribe();
    }

    public createPlayer(playerName: string) {
        this.exampleService.createPlayer(playerName, this.cacheService.gamekey!)
            .pipe(
                tap((value: PlayerModel) => {
                    this.cacheService.id = +value.id;
                })
            ).subscribe();
    }

    public redirectPlayground() {
        window.location.href = "playground";
    }

}
