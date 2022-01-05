import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingComponent } from './onboarding.component';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { PokerGameService } from '../../services/poker-game.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Game, Player, UserError } from '../../models/model';
import {BehaviorSubject, Observable, of} from 'rxjs';

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
}

class PokerGameServiceStub implements Partial<PokerGameService> {
  game$ = new BehaviorSubject<Game>(GAME_INIT_VALUE);
  players$ = new BehaviorSubject<Player[]>([]);
  error$ = new BehaviorSubject<UserError>(ERROR_INIT_VALUE);

  setGameKey(gameKey: string) {
    this.game$.next({...this.game$.value, gameKey: gameKey});
  }
  setAsTableMaster() {
    this.game$.next({...this.game$.value, iAmTableMaster: true});
  }
  createTablemaster(tablemasterName: string): Observable<boolean> {
    return of(true);
  }
  public createPlayer(playerName: string): Observable<boolean> {
    return of(true);
  }
}

describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;
  let pokerGameServiceStub: PokerGameServiceStub;
  let setGameKeySpy: jasmine.Spy<(gameKey: string) => void>;
  let setAsTableMasterSpy: jasmine.Spy<() => void>;

  beforeEach(() => {
    pokerGameServiceStub = new PokerGameServiceStub();
    setGameKeySpy = spyOn(pokerGameServiceStub, "setGameKey").and.callThrough();
    setAsTableMasterSpy = spyOn(pokerGameServiceStub, "setAsTableMaster").and.callThrough();
    spyOn(pokerGameServiceStub, "createTablemaster").and.callThrough();
    spyOn(pokerGameServiceStub, "createPlayer").and.callThrough();

    TestBed.configureTestingModule({
      declarations: [OnboardingComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceStub},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({gamekey: '11'})}}},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onboarding for master', () => {
    setGameKeySpy.calls.reset();
    setAsTableMasterSpy.calls.reset();
    var activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot = {paramMap: convertToParamMap({})} as ActivatedRouteSnapshot;
    component.ngOnInit();
    expect(pokerGameServiceStub.setGameKey).not.toHaveBeenCalled();
    expect(pokerGameServiceStub.setAsTableMaster).toHaveBeenCalled();
  });

  it('should onboarding for player', () => {
    expect(pokerGameServiceStub.setGameKey).toHaveBeenCalledOnceWith('11');
    expect(pokerGameServiceStub.setAsTableMaster).not.toHaveBeenCalled();
  });

  it('call createTablemaster', () => {
    spyOn(component, "createTablemaster").and.callThrough();
    var activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot = {paramMap: convertToParamMap({})} as ActivatedRouteSnapshot;
    component.ngOnInit();
    component.create('Test');
    expect(component.createTablemaster).toHaveBeenCalledWith("Test");
    expect(pokerGameServiceStub.createPlayer).not.toHaveBeenCalled();
  });

  it('call createPlayer', () => {
    spyOn(component, "createPlayer").and.callThrough();
    component.create('Test');
    expect(component.createPlayer).toHaveBeenCalledOnceWith('Test');
    expect(pokerGameServiceStub.createTablemaster).not.toHaveBeenCalled();
  });

  it('createPlayer', () => {
    component.ngOnInit();
    component.create('Test');
    expect(pokerGameServiceStub.createPlayer).toHaveBeenCalledOnceWith('Test');
  });

});
