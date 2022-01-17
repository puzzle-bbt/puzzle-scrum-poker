import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerListComponent } from './playerlist.component';
import { PokerGameService } from '../../services/poker-game.service';
import { BehaviorSubject, of } from 'rxjs';
import { Game, Player } from '../../models/model';
import { BackendMessengerService } from '../../services/backend-messenger.service';
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
  name: 'Player',
  playing: true,
  selectedCard: undefined
};

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let messengerServiceSpy: jasmine.SpyObj<BackendMessengerService>;
  let copyButton: HTMLElement;


  beforeEach(() => {
    pokerGameServiceSpy = createSpyObj('PokerGameService',
      ['getPlayers', 'kickplayer'],
      {
        game$: new BehaviorSubject<Game>({
          ...GAME_INIT_VALUE,
          iAmTableMaster: true
        }),
        players$: new BehaviorSubject<Player[]>([PLAYER_INIT_VALUE])
      });
    messengerServiceSpy = createSpyObj('BackendMessengerService', ['subscribe']);

    pokerGameServiceSpy.getPlayers.and.returnValue(of(PLAYER_INIT_VALUE));
    pokerGameServiceSpy.kickplayer.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [PlayerListComponent],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
        {provide: BackendMessengerService, useValue: messengerServiceSpy}
      ]
    });
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnit', () => {
    let spyRefresh = spyOn(component, 'refresh');

    component.ngOnInit();
    expect(spyRefresh).toHaveBeenCalledTimes(1);
  });

  it('should refresh', () => {
    component.refresh();

    expect(pokerGameServiceSpy.getPlayers).toHaveBeenCalledTimes(1);
  });

  it('call kickPlayer', () => {
    component.kickPlayer(1);
    expect(pokerGameServiceSpy.kickplayer).toHaveBeenCalledWith('0', 1);
  });

  it('should call copyLink function', () => {
    let spyCopyLink = spyOn(component, 'copyLink');
    fixture.detectChanges();
    copyButton = fixture.nativeElement.querySelector('button');

    expect(copyButton.textContent).toContain('Einladungslink kopieren');
    copyButton.click();
    expect(spyCopyLink).toHaveBeenCalledTimes(1);
  });

  it('should execute copyLink function without error', (done) => {
    try {
      component.copyLink();
      done();
    } catch (error) {
      fail('a error is occurred: ' + error);
    }
  });

  it('should by isOnDesktop true', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(769);
    window.dispatchEvent(new Event('resize'));
    var isOnDesktop = component.isOnDesktop();
    expect(isOnDesktop).toBeTrue();
  });

  it('should by isOnDesktop false', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(767);
    window.dispatchEvent(new Event('resize'));
    var isOnDesktop = component.isOnDesktop();
    expect(isOnDesktop).toBeFalse();
  });

});
