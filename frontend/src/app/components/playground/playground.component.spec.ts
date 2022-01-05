import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlaygroundComponent} from './playground.component';
import {PokerGameService} from "../../services/poker-game.service";
import {BehaviorSubject, of} from "rxjs";
import {Game} from "../../models/model";
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

describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;

  beforeEach( () => {
    pokerGameServiceSpy = createSpyObj('PokerGameService', ['toggleGameRunning'],
      {
        game$: new BehaviorSubject<Game>(GAME_INIT_VALUE)
      });

    pokerGameServiceSpy.toggleGameRunning.and.returnValue(of(false));

    TestBed.configureTestingModule({
      declarations: [PlaygroundComponent],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call changeGameState', () => {
    component.changeGameState();
    expect(pokerGameServiceSpy.toggleGameRunning).toHaveBeenCalledTimes(1);
  });

});
