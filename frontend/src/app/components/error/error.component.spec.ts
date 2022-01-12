import { ComponentFixture, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;

import { ErrorComponent } from './error.component';
import {PokerGameService} from "../../services/poker-game.service";
import {BehaviorSubject} from "rxjs";
import {Game, Player, UserError} from "../../models/model";

const GAME_INIT_VALUE: Game = {
  gameKey: '0',
  isGameRunning: false,
  me: undefined,
  iAmTableMaster: false,
  roundInfo: undefined,
  roundInfoLink: undefined,
  average: undefined
};

const ERROR_INIT_VALUE: UserError = {
  httpCode: undefined,
  message: ''
};

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;

  beforeEach(async () => {
    pokerGameServiceSpy = createSpyObj('PokerGameService', [], {
      error$ : new BehaviorSubject(ERROR_INIT_VALUE),
      game$ : new BehaviorSubject(GAME_INIT_VALUE)
    });

    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
