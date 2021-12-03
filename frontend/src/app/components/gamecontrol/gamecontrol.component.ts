import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../../player';
import { ExampleService } from '../../services/example-service';
import { PlayerModel } from '../../models/model';
import { Observable, tap } from 'rxjs';
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {PokerGameService} from "../../services/poker-game.service";

@Component({
    selector: 'app-gamecontrol',
    templateUrl: './gamecontrol.component.html',
    styleUrls: ['./gamecontrol.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamecontrolComponent implements OnInit {
    newPlayerId?: number;
    players?: Player[];
    isGameRunning?: boolean;
    average?: number;

    playerModel$: Observable<PlayerModel>  | undefined;
    playerModel: PlayerModel = {
        gameKey: '',
        id: '',
        selectedCard: undefined
    };

    constructor(
        private pokerService: PokerGameService,
        private exampleService: ExampleService,
        private messenger: BackendMessengerService) {}

    ngOnInit(): void {
        this.messenger.subscribe((msg: string) => {});
    }

    public createTablemaster(tablemasterName: string) {
        this.playerModel$ = this.exampleService.createTablemaster(tablemasterName)
            .pipe(
                tap((value: PlayerModel) => {
                    this.playerModel = value;
                })
            );
    }

    public createPlayer(playerName: string) {
        this.pokerService.createPlayer(this.playerModel.gameKey!, playerName).subscribe(
            (playerId: number) => {
                this.newPlayerId = playerId;
            }
        );
    }

    public setSelectedCard(playerId: string, selectedCard: string) {
        this.pokerService.setSelectedCard(this.playerModel.gameKey!, +playerId, selectedCard).subscribe(
            (selectedCard: string) => {
            }
        );
    }

    public setPlayerMode(playerId: string, playerMode: string) {
        this.pokerService.setPlayerMode(this.playerModel.gameKey!, +playerId, playerMode == 'true').subscribe(
            () => {
            }
        );
    }

    public getAverage() {
        this.pokerService.getAverage(this.playerModel.gameKey!).subscribe(
            (average: number) => {
                this.average = average;
            }
        );
    }

    public getPlayers() {
        this.pokerService.getPlayers(this.playerModel.gameKey!).subscribe(
            (players: Player[]) => {
                this.players = players;
            }
        );
    }

    public sendWSMessage(msg: string) {
        this.messenger.sendMessage(msg);
    }

    public gameover() {
        this.pokerService.gameover(this.playerModel.gameKey!).subscribe(
            () => {
                this.isGameRunning = false;
            }
        );
    }

    public gamestart() {
        this.pokerService.gamestart(this.playerModel.gameKey!).subscribe(
            () => {
                this.isGameRunning = true;
            }
        );
    }

    public kickplayer(playerId: number) {
        this.pokerService.kickplayer(this.playerModel.gameKey!, playerId).subscribe(
            () => {
            }
        );
    }
}
