import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingComponent } from './onboarding.component';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { PokerGameService } from '../../services/poker-game.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Game, Player, UserError } from '../../models/model';
import createSpyObj = jasmine.createSpyObj;
import {BehaviorSubject, Observable, of} from 'rxjs';

const GAME_INIT_VALUE: Game = {
  gameKey: '',
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

describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;

  beforeEach(() => {
    pokerGameServiceSpy = createSpyObj('PokerGameService',
      ['setGameKey', 'setAsTableMaster', 'createTablemaster', 'createPlayer'],
      {
        game$: new BehaviorSubject<Game>(GAME_INIT_VALUE),
        players$: new BehaviorSubject<Player[]>([]),
        error$: new BehaviorSubject<UserError>(ERROR_INIT_VALUE)
      });
    pokerGameServiceSpy.setGameKey.and.callThrough();
    pokerGameServiceSpy.setAsTableMaster.and.callThrough();
    pokerGameServiceSpy.createTablemaster.and.callThrough();
    pokerGameServiceSpy.createPlayer.and.callThrough();
    pokerGameServiceSpy.createPlayer.and.returnValue(of(true));

    TestBed.configureTestingModule({
      declarations: [OnboardingComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({gamekey: '11'})}}},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onboarding for master', () => {
    var activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot = {paramMap: convertToParamMap({})} as ActivatedRouteSnapshot;
    component.ngOnInit();
    expect(pokerGameServiceSpy.setGameKey).not.toHaveBeenCalled();
    expect(pokerGameServiceSpy.setAsTableMaster).toHaveBeenCalled();
  });

  it('should onboarding for player', () => {
    component.ngOnInit();
    expect(pokerGameServiceSpy.setGameKey).toHaveBeenCalledOnceWith('11');
  });

  it('call createTablemaster', () => {
    var activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot = {paramMap: convertToParamMap({})} as ActivatedRouteSnapshot;
    pokerGameServiceSpy.setAsTableMaster;
    component.ngOnInit();
    component.create('Test');
    expect(component.createTablemaster).toHaveBeenCalledOnceWith('Test');
  });

  it('call createPlayer', () => {
    var activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot = {paramMap: convertToParamMap({})} as ActivatedRouteSnapshot;
    component.ngOnInit();

    component.create('Test');
    expect(component.createPlayer).toHaveBeenCalledOnceWith('Test');
  });

  it('createPlayer', () => {
    component.ngOnInit();
    component.create('Test');
    expect(pokerGameServiceSpy.createPlayer).toHaveBeenCalledOnceWith('Test');
  });

});
