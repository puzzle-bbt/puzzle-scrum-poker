import { ComponentFixture, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;

import { PlaygroundComponent } from './playground.component';
import {PokerGameService} from "../../services/poker-game.service";
import {BehaviorSubject} from "rxjs";
import {Game} from "../../models/model";

describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let subjectMock: BehaviorSubject<Game>;

  beforeEach(async () => {
    subjectMock = new BehaviorSubject<Game>({
      gameKey: "0",
      iAmTableMaster: false,
      isGameRunning: false,
    }as Game)
    pokerGameServiceSpy = createSpyObj('PokerGameService', [], {'game$' : subjectMock});

    await TestBed.configureTestingModule({
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
