import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayerListComponent} from './playerlist.component';
import {PokerGameService} from "../../services/poker-game.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Game, Player} from "../../models/model";
import {BackendMessengerService} from "../../services/backend-messenger.service";
import createSpyObj = jasmine.createSpyObj;

const GAME_INIT_VALUE: Game = {
  gameKey: '0',
  isGameRunning: false,
  me: undefined,
  iAmTableMaster: false,
  roundInfo: undefined,
  roundInfoLink: undefined,
  average: undefined
};

const PLAYER_INIT_VALUE: Player = {
  id: 1,
  name: "Player",
  playing: true,
  selectedCard: undefined
};

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let messengerServiceSpy: jasmine.SpyObj<BackendMessengerService>;

  beforeEach( () => {
     pokerGameServiceSpy = createSpyObj('PokerGameService',
       ['getPlayers', 'kickplayer'],
       {
         game$: new BehaviorSubject<Game>(GAME_INIT_VALUE),
         players$: new BehaviorSubject<Player>(PLAYER_INIT_VALUE)
       });
    messengerServiceSpy = createSpyObj('BackendMessengerService', ['subscribe']);

    pokerGameServiceSpy.getPlayers.and.returnValue(of(PLAYER_INIT_VALUE));
    pokerGameServiceSpy.kickplayer.and.callThrough();

  TestBed.configureTestingModule({
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
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call getplayers', () => {
    component.refresh();
    expect(pokerGameServiceSpy.getPlayers).toHaveBeenCalled();
  });

  it('call kickPlayer', () => {
    component.kickPlayer(1);
    expect(pokerGameServiceSpy.kickplayer).toHaveBeenCalledWith("0", 1);
  });

  it('isOnDesktop', () => {
    var isOnDesktop = component.isOnDesktop();
    expect(isOnDesktop).toBeTrue();
  });


});
