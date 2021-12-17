import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { Game, Player, UserError } from '../models/model';
import { Router } from '@angular/router';
import { BackendMessengerService } from './backend-messenger.service';

const BASE_URL = '/api';
const BASE_GET_REQUEST_OPTIONS = {
  headers: {
    'responseType': 'json'
  }
}

@Injectable({
  providedIn: 'root'
})
export class PokerGameService {

  // current player list
  players$: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  // current game data
  game$: BehaviorSubject<Game> = new BehaviorSubject<Game>({
    // TODO: backend should get a number
    gameKey: '',
    isGameRunning: false,
    me: undefined,
    iAmTableMaster: false,
    roundInfo: undefined,
    roundInfoLink: undefined,
    average: undefined
  });

  // current error data
  error$: BehaviorSubject<UserError> = new BehaviorSubject<UserError>({
    httpCode: undefined,
    message: ''
  });

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly messenger: BackendMessengerService
  ) {
      this.messenger.subscribe((message) => {
          if (message.includes('gameStart')) {
              this.game$.value.isGameRunning = true;
          }
          if (message.includes('gameOver')) {
              this.game$.value.isGameRunning = false;
          }
      });
  }

  setAsTableMaster() {
    this.game$.next({...this.game$.value, iAmTableMaster: true});
  }

  setGameKey(gameKey: string) {
    this.game$.next({...this.game$.value, gameKey: gameKey});
  }

  setGameRunning(isRunning: boolean) {
    this.game$.next({...this.game$.value, isGameRunning: isRunning});
  }

  changePlayerMode(isPlaying: boolean) {
    this.game$.next({...this.game$.value, me: {...this.game$.value.me!, playing: isPlaying}});
  }

  setCardValue(value: string) {
    this.game$.next({...this.game$.value, me: {...this.game$.value.me!, selectedCard: value}});
  }

  setAverage(average: number) {
    this.game$.next({...this.game$.value, average: average});
  }

  public createTablemaster(tablemasterName: string): Observable<boolean> {
    return this.httpClient.get<OnboardingModel>(`${BASE_URL}/createTablemaster/${tablemasterName}`, BASE_GET_REQUEST_OPTIONS)
      .pipe(
        tap(value => console.log('-------->', value)),
        map(createModel => {
          this.initializeModel(createModel, true)

          this.messenger.sendMessage(`table=${this.game$.value.gameKey},playerid=${this.game$.value.me!.id}`);
          this.router.navigateByUrl('/playground');
          return true;
        }),
        catchError(error => {
          console.error('Can not create a table master: ', error);
          this.handleError(error);
          return of(false);
        })
      )
  }

  public createPlayer(playerName: string): Observable<boolean> {
    return this.httpClient.get<OnboardingModel>(`${BASE_URL}/createPlayer/${playerName}/${this.game$.value.gameKey}`, BASE_GET_REQUEST_OPTIONS)
      .pipe(
        tap(value => console.log('-------->', value)),
        map(createModel => {
          this.initializeModel(createModel)

          this.messenger.sendMessage(`table=${this.game$.value.gameKey},playerid=${this.game$.value.me!.id}`);
          this.router.navigateByUrl('/playground');
          return true;
        }),
        catchError(error => {
          console.error('Can not create a player: ', error);
          this.handleError(error);
          return of(false);
        })
      )
  }

  public setSelectedCard(gamekey: string, playerid: number, selectedCard: string): Observable<string> {
    this.setCardValue(selectedCard);
    return this.httpClient.get<string>(`${BASE_URL}/players/setselectedcard/${gamekey}/${playerid}/${selectedCard}`, BASE_GET_REQUEST_OPTIONS)
      .pipe(
        tap(value => console.log('-------->', value)),
        catchError(error => {
          console.error('Can not select card: ', error);
          this.handleError(error);
          return EMPTY;
        })
      )
  }

  public setPlayerMode(gamekey: string, playerid: number, isPlaying: boolean): Observable<void> {
    this.changePlayerMode(isPlaying);
    return this.httpClient.get<void>(`${BASE_URL}/players/setplayermode/${gamekey}/${playerid}/${isPlaying}`, BASE_GET_REQUEST_OPTIONS)
      .pipe(
        tap(value => console.log('-------->', value)),
        catchError(error => {
          console.error('Can not set playermode: ', error);
          this.handleError(error);
          return EMPTY;
        })
      );
  }

  public getPlayerMode(gamekey: string, playerid: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${BASE_URL}/players/getplayermode/${gamekey}/${playerid}`, BASE_GET_REQUEST_OPTIONS)
      .pipe(
        tap(value => console.log('-------->', value)),
        catchError(error => {
          console.error('Can not get playermode: ', error);
          this.handleError(error);
          return EMPTY;
        })
      );
  }

  public getAverage(gamekey: string): Observable<any> {
    return this.httpClient.get<number>(`${BASE_URL}/average/${gamekey}`, BASE_GET_REQUEST_OPTIONS)
      .pipe(
        tap(value => console.log('-------->', value)),
        tap(value => {
          this.setAverage(value);
        }),
        catchError(error => {
          console.error('Can not get average: ', error);
          this.handleError(error);
          return EMPTY;
        })
      );
  }

  offboarding(gamekey: string, playerid: number, isTablemaster: object) {
    return this.httpClient.get(`${BASE_URL}/tables/offboarding/${gamekey}/${playerid}/${isTablemaster}`, BASE_GET_REQUEST_OPTIONS)
      .pipe(
        tap(value => console.log('-------->', value)),
        catchError(error => {
          console.error('Can not offboard player: ', error);
          this.handleError(error);
          return EMPTY;
        })
      );
  }

  kickplayer(gamekey: string, playerid: number) {
    return this.httpClient.get(`${BASE_URL}/tables/kickplayer/${gamekey}/${playerid}`, BASE_GET_REQUEST_OPTIONS)
      .pipe(
        tap(value => console.log('-------->', value)),
        catchError(error => {
          console.error('Can not kick player: ', error);
          this.handleError(error);
          return EMPTY;
        })
      );
  }

  // TODO: Backend should have a toggleGameRunning method and response the new running state.
  public toggleGameRunning(): Observable<any> {
    if (this.game$.value.isGameRunning) {
      return this.httpClient.get(`${BASE_URL}/tables/gameover/${this.game$.value.gameKey}`, BASE_GET_REQUEST_OPTIONS).pipe(
        tap(value => console.log('-------->', value)),
        map(() => {
          this.setGameRunning(false);
        }),
        catchError(error => {
          console.error('Can not end game: ', error);
          this.handleError(error);
          return EMPTY;
        })
      );
    } else {
      return this.httpClient.get(`${BASE_URL}/tables/gameStart/${this.game$.value.gameKey}`, BASE_GET_REQUEST_OPTIONS).pipe(
        tap(value => console.log('-------->', value)),
        map(() => {
          this.setGameRunning(true);
        }),
        catchError(error => {
          console.error('Can not start game: ', error);
          this.handleError(error);
          return EMPTY;
        })
      );
    }
  }

  public getPlayers(): Observable<any> {
    return this.httpClient.get<Player[]>(`${BASE_URL}/tables/getplayers/${this.game$.getValue().gameKey}`, BASE_GET_REQUEST_OPTIONS).pipe(
      tap(value => console.log('-------->', value)),
      map(players => {
        this.players$.next(players);
      }),
      catchError(error => {
        console.error('Can not get players: ', error);
        this.handleError(error);
        return EMPTY;
      })
    );
  }

  public getRoundName(gamekey: string): Observable<any> {
    return this.httpClient.get<RoundInfoModel>(`${BASE_URL}/tables/getroundname/${gamekey}`, BASE_GET_REQUEST_OPTIONS).pipe(
      tap(value => console.log('-------->', value)),
      map(data => {
        this.game$.next({...this.game$.value, roundInfo: data.roundInfo, roundInfoLink: data.roundInfoLink});
      }),
      catchError(error => {
        console.error('Can not get roundname: ', error);
        this.handleError(error);
        return EMPTY;
      })
    );
  }

  public setRoundName(gamekey: string, roundname: string): Observable<void> {
    return this.httpClient.get<void>(`${BASE_URL}/tables/setroundname/${gamekey}/${roundname}`, BASE_GET_REQUEST_OPTIONS).pipe(
      catchError(error => {
        console.error('Can not set roundname: ', error);
        this.handleError(error);
        return EMPTY;
      })
    );
  }

  //Card Service
  public getCardSvg(cardName: string): Observable<string> {
    return this.httpClient.get(`../assets/images/${cardName}`, {responseType: 'text'});
  }

  public handleError(error: HttpErrorResponse) {
    const usererror: UserError = {
      httpCode: error.status,
      message: error.message,
    }
    this.error$.next(usererror);
    this.router.navigateByUrl('/error');
  }

  private initializeModel(onboardingModel: OnboardingModel, iAmTableMaster: boolean = false) {
    const player: Player = {
      // TODO: backend should get a number
      id: Number(onboardingModel.id),
      name: '',
      playing: true,
      selectedCard: undefined
    };
    const game: Game = {
      gameKey: onboardingModel.gameKey,
      isGameRunning: false,
      me: player,
      iAmTableMaster: iAmTableMaster,
      roundInfo: undefined,
      roundInfoLink: undefined,
      average: undefined
    }

    this.game$.next(game);
    console.log('game --> ', this.game$.value);
  }


}

interface OnboardingModel {
  id: string;
  gameKey: string;
  selectedCard: string;
}

interface RoundInfoModel {
  roundInfo: string | undefined;
  roundInfoLink: string;
}
