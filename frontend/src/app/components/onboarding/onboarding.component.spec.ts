import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OnboardingComponent} from './onboarding.component';
import {ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap} from "@angular/router";
import {PokerGameService} from "../../services/poker-game.service";
import {RouterTestingModule} from "@angular/router/testing";
import createSpyObj = jasmine.createSpyObj;


describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;

  beforeEach(() => {
    pokerGameServiceSpy = createSpyObj('PokerGameService', ['setGameKey', 'setAsTableMaster', 'createTablemaster', 'createPlayer']);
    pokerGameServiceSpy.setGameKey.and.callThrough();
    pokerGameServiceSpy.setAsTableMaster.and.callThrough();
    pokerGameServiceSpy.createTablemaster.and.callThrough();
    pokerGameServiceSpy.createPlayer.and.callThrough();

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
});
