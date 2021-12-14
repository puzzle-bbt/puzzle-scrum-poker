import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PokerGameService } from './services/poker-game.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let pokerGameService;
  let cacheService;

  beforeEach(async () => {
    pokerGameService = jasmine.createSpyObj('PokerGameService', ['setPlayerMode']);
    pokerGameService.setPlayerMode.and.returnvalue(of(''));

    cacheService = jasmine.createSpyObj('CacheService', [], {id: 5, gamekey: 'ZZ456'});

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [AppComponent],
      providers: [
        {provider: PokerGameService, useValue: pokerGameService},
        {provider: PokerGameService, useValue: pokerGameService}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
