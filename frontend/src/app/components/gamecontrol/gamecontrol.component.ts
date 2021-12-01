import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Player } from '../../player';
import { ExampleService } from '../../services/example-service';
import { PlayerModel } from '../../models/model';
import { Observable, tap } from 'rxjs';
import {BackendMessagesService} from "../../services/backend-messages.service";

@Component({
    selector: 'app-gamecontrol',
    templateUrl: './gamecontrol.component.html',
    styleUrls: ['./gamecontrol.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamecontrolComponent implements OnInit, OnDestroy {
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
        private httpService: HttpService,
        private exampleService: ExampleService,
        private backendMessages: BackendMessagesService) {}



    ngOnInit(): void {
        this.backendMessages.openWSConnection(
            () => {
            }
        );
    }

    ngOnDestroy(): void {
        this.backendMessages.closeWSConnection();
    }

    public createTablemaster(tablemasterName: string) {
        this.playerModel$ = this.exampleService.createTablemaster(tablemasterName);
        this.playerModel$.pipe(
            tap(value => {
                this.playerModel = value;
            })
        )
    }

    public createPlayer(playerName: string) {
        this.httpService.createPlayer(this.playerModel.gameKey, playerName).subscribe(
            (playerId) => {
                this.newPlayerId = playerId;
            }
        );
    }

    public setSelectedCard(playerId: string, selectedCard: string) {
        this.httpService.setSelectedCard(this.playerModel.gameKey, +playerId, selectedCard).subscribe(
            (selectedCard) => {
            }
        );
    }

    public setPlayerMode(playerId: string, playerMode: string) {
        this.httpService.setPlayerMode(this.playerModel.gameKey, +playerId, playerMode == 'true').subscribe(
            () => {
            }
        );
    }

    public getAverage() {
        this.httpService.getAverage(this.playerModel.gameKey).subscribe(
            (average) => {
                this.average = average;
            }
        );
    }

    public getPlayers() {
        this.httpService.getPlayers(this.playerModel.gameKey).subscribe(
            (players) => {
                this.players = players;
            }
        );
    }

    public sendWSMessage(msg: string) {
        this.backendMessages.sendWSMessage(msg);
    }

    public gameover() {
        this.httpService.gameover(this.playerModel.gameKey).subscribe(
            () => {
                this.isGameRunning = false;
            }
        );
    }

    public gamestart() {
        this.httpService.gamestart(this.playerModel.gameKey).subscribe(
            () => {
                this.isGameRunning = true;
            }
        );
    }

    public kickplayer(playerId: number) {
        this.httpService.kickplayer(this.playerModel.gameKey, playerId).subscribe(
            () => {
            }
        );
    }
}
