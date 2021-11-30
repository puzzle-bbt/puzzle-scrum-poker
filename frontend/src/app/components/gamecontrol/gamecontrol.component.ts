import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { WebsocketService } from '../../websocket.service';
import { Player } from '../../player';
import { ExampleService } from '../../services/example-service';
import { OnboardingTableMaster } from '../../models/model';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'app-gamecontrol',
    templateUrl: './gamecontrol.component.html',
    styleUrls: ['./gamecontrol.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamecontrolComponent implements OnInit, OnDestroy {


    gamekey?: string;
    tablemasterId?: string;
    newPlayerId?: number;
    players?: Player[];
    isGameRunning?: boolean;
    average?: number;
    onboardingTableMaster$?: Observable<OnboardingTableMaster>;

    constructor(
        private httpService: HttpService,
        private exampleService: ExampleService,
        private websocketService: WebsocketService) {}



    ngOnInit(): void {
        this.websocketService.openWSConnection(
            () => {
            }
        );
    }

    ngOnDestroy(): void {
        this.websocketService.closeWSConnection();
    }

    public createTablemaster(tablemasterName: string) {
        // this.onboardingTableMaster$ = this.exampleService.createTablemaster(tablemasterName);
        // this.onboardingTableMaster$.pipe(
        //     tap(value => this.tableName = value.tableName)
        // )

        this.httpService.createTablemaster(tablemasterName).subscribe(
            (text) => {
                let contents = text.split(',');
                this.gamekey = contents[0];
                this.tablemasterId = contents[1];
            });
    }

    public createPlayer(playerName: string) {
        this.httpService.createPlayer(this.gamekey!, playerName).subscribe(
            (playerId) => {
                this.newPlayerId = playerId;
            }
        );
    }

    public setSelectedCard(playerId: string, selectedCard: string) {
        this.httpService.setSelectedCard(this.gamekey!, +playerId, selectedCard).subscribe(
            (selectedCard) => {
            }
        );
    }

    public setPlayerMode(playerId: string, playerMode: string) {
        this.httpService.setPlayerMode(this.gamekey!, +playerId, playerMode == 'true').subscribe(
            () => {
            }
        );
    }

    public getAverage() {
        this.httpService.getAverage(this.gamekey!).subscribe(
            (average) => {
                this.average = average;
            }
        );
    }

    public getPlayers() {
        this.httpService.getPlayers(this.gamekey!).subscribe(
            (players) => {
                this.players = players;
            }
        );
    }

    public sendWSMessage(msg: string) {
        this.websocketService.sendWSMessage(msg);
    }

    public gameover() {
        this.httpService.gameover(this.gamekey!).subscribe(
            () => {
                this.isGameRunning = false;
            }
        );
    }

    public gamestart() {
        this.httpService.gamestart(this.gamekey!).subscribe(
            () => {
                this.isGameRunning = true;
            }
        );
    }

    public kickplayer(playerId: number) {
        this.httpService.kickplayer(this.gamekey!, playerId).subscribe(
            () => {
            }
        );
    }
}
