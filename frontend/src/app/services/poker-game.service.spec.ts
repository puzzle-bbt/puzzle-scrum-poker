import { OnboardingModel, PokerGameService } from './poker-game.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendMessengerService } from './backend-messenger.service';
import { of } from 'rxjs';
import { Game, Player } from '../models/model';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

const GAME_INIT_VALUE: Game = {
  gameKey: '',
  isGameRunning: false,
  me: undefined,
  iAmTableMaster: false,
  roundInfo: undefined,
  roundInfoLink: undefined,
  average: undefined
};

const PLAYER_INIT_VALUE: Player = {
  id: NaN,
  name: 'Foo Bar',
  playing: true,
  selectedCard: undefined
}

describe('PokerGameService', () => {
  let service: PokerGameService;
  let httpClientSpy: SpyObj<HttpClient>;
  let routerSpy: SpyObj<Router>;
  let backendMessengerServiceSpy: SpyObj<BackendMessengerService>;

  beforeEach(() => {
    httpClientSpy = createSpyObj('HttpClient', ['get']);

    routerSpy = createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.returnValue(Promise.resolve(true));

    backendMessengerServiceSpy = createSpyObj('BackendMessengerService',
      ['subscribe', 'sendMessage', 'setGame']);
    backendMessengerServiceSpy.subscribe.and.callThrough();
    backendMessengerServiceSpy.sendMessage.and.callThrough();
    backendMessengerServiceSpy.setGame.and.callThrough();

    service = new PokerGameService(httpClientSpy, routerSpy, backendMessengerServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(backendMessengerServiceSpy.subscribe).toHaveBeenCalledTimes(1);
  });

  it('should setAsTableMaster', () => {
    expect(service.game$.value).toEqual({...GAME_INIT_VALUE, iAmTableMaster: false});
    service.setAsTableMaster();
    expect(service.game$.value).toEqual({...GAME_INIT_VALUE, iAmTableMaster: true});
  });

  const GET_OPTIONS = {
    headers: {
      'responseType': 'json'
    }
  }

  it('should createTablemaster', (done) => {
    // given
    const name = 'Master';
    httpClientSpy.get.and.returnValue(of({
      id: '11',
      name: 'Foo Bar',
      gameKey: '123456',
      isGameRunning: false,
      selectedCard: ''
    } as OnboardingModel));

    // when + then
    service.createTablemaster(name).subscribe(value => {
      expect(value).toBeTruthy();
      expect(httpClientSpy.get).toHaveBeenCalledOnceWith(`/api/createTablemaster/${name}`, GET_OPTIONS);
      expect(service.game$.value).toEqual({
      ...GAME_INIT_VALUE,
          isGameRunning: false,
          iAmTableMaster: true,
          gameKey: '123456',
          me: {...PLAYER_INIT_VALUE, id: 11, name: 'Foo Bar'}
      });
      done();
    });
  });
});
