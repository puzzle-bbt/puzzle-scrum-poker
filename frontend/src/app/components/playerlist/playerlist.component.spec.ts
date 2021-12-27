import { ComponentFixture, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;

import { PlayerListComponent } from './playerlist.component';
import {PokerGameService} from "../../services/poker-game.service";
import {BehaviorSubject, of} from "rxjs";
import {Game, Player} from "../../models/model";
import {BackendMessengerService} from "../../services/backend-messenger.service";

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let messengerServiceSpy: jasmine.SpyObj<BackendMessengerService>;
  let gameSubjectMock: BehaviorSubject<Game>;
  let playerSubjectMock: BehaviorSubject<Player>;

  beforeEach(async () => {
    gameSubjectMock = new BehaviorSubject<Game>({
      gameKey: "0",
      iAmTableMaster: false,
      isGameRunning: false,
    }as Game)
    playerSubjectMock = new BehaviorSubject<Player>({
      id: 1,
      name: "Player",
      playing: true
    }as Player)
    pokerGameServiceSpy = createSpyObj('PokerGameService', ['getPlayers', 'kickPlayer'], [{'game$' : gameSubjectMock}, {'players$' : playerSubjectMock}]);
    pokerGameServiceSpy.getPlayers.and.returnValue(of(playerSubjectMock));
    messengerServiceSpy = createSpyObj('BackendMessengerService', ['subscribe']);


    await TestBed.configureTestingModule({
      declarations: [PlayerListComponent],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
        {provide: BackendMessengerService, useValue: messengerServiceSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
