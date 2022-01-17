import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PokerGameService } from './services/poker-game.service';
import {BehaviorSubject  } from 'rxjs';
import {Game} from "./models/model";

describe('AppComponent', () => {
  let pokerGameServiceSpy : jasmine.SpyObj<PokerGameService>;
  let subjectMock: BehaviorSubject<Game>;

  beforeEach(async () => {
    pokerGameServiceSpy = jasmine.createSpyObj('PokerGameService', ['setPlayerMode'], {
      game$: subjectMock
    });

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
