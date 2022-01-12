import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopEstimationComponent } from './desktop-estimation.component';
import {PokerGameService} from "../../services/poker-game.service";
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {BehaviorSubject, of} from "rxjs";
import {Game, Player} from "../../models/model";
import createSpyObj = jasmine.createSpyObj;
import {ChangeDetectorRef} from "@angular/core";

describe('DesktopEstinationComponent', () => {
  let component: DesktopEstimationComponent;
  let fixture: ComponentFixture<DesktopEstimationComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let messengerServiceSpy: jasmine.SpyObj<BackendMessengerService>;
  let subjectMock: BehaviorSubject<Game>;
  let playerMock: BehaviorSubject<Player>;
  let changeDetectorRefSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    playerMock = new BehaviorSubject<Player>({
      id: 1,
      name: "Player",
      playing: false,
      selectedCard: undefined,
    }as Player)
    subjectMock = new BehaviorSubject<Game>({
      gameKey: '',
      isGameRunning: false,
      me: playerMock.value,
      iAmTableMaster: false,
      roundInfo: undefined,
      roundInfoLink: undefined,
      average: 2
    }as Game)
    pokerGameServiceSpy = createSpyObj('PokerGameService', ['setSelectedCard', 'getAverage', 'getCardSvg'], {game$ : subjectMock});
    pokerGameServiceSpy.getCardSvg.and.returnValue(of());
    pokerGameServiceSpy.getAverage.and.returnValue(of(pokerGameServiceSpy.game$.value.average))
    messengerServiceSpy = createSpyObj('BackendMessengerService', ['subscribe']);
    changeDetectorRefSpy = createSpyObj('ChangeDetectorRef', ['markForCheck']);

    await TestBed.configureTestingModule({
      declarations: [DesktopEstimationComponent],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
        {provide: BackendMessengerService, useValue: messengerServiceSpy},
        {provide: ChangeDetectorRef, useValue: changeDetectorRefSpy},
      ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getAverage', () => {
    component.getAverage();
    expect(pokerGameServiceSpy.getAverage).toHaveBeenCalledTimes(1);
  });

  it('should ngOnIt', () => {
    let spyRefresh = spyOn(component, 'refresh');
    let spyAddCards = spyOn(component, 'addCards');

    component.ngOnInit();
    expect(spyRefresh).toHaveBeenCalledTimes(1);
    expect(spyAddCards).toHaveBeenCalledTimes(1);
  });

  it('should addCards', () => {
    component.addCards();
    expect(pokerGameServiceSpy.getCardSvg).toHaveBeenCalledTimes(2);
  });

  it('should turnCards', () => {
    let spyResetCards = spyOn(component, 'resetCards');
    let frontCards = document.getElementById('cardContainerFront');
    let backCards = document.getElementById('cardContainerBack');

    pokerGameServiceSpy.game$.value.isGameRunning = true;
    component.turnCards();
    expect(backCards!.classList.contains('visible'));
    expect(frontCards!.classList.contains('hidden'));


    pokerGameServiceSpy.game$.value.isGameRunning = false;
    component.turnCards();
    expect(spyResetCards).toHaveBeenCalledTimes(1);
    expect(backCards!.classList.contains('hidden'));
    expect(frontCards!.classList.contains('visible'));
  });


  it('should refresh', () => {
    let frontCards = document.getElementById('cardContainerFront');
    let backCards = document.getElementById('cardContainerBack');

    playerMock.value.playing = false;
    component.refresh();
    frontCards!.classList.contains('hidden');
    backCards!.classList.contains('hidden');

    playerMock.value.playing = true;
    component.refresh();
    frontCards!.classList.contains('visible');
    backCards!.classList.contains('hidden');

    pokerGameServiceSpy.game$.value.isGameRunning = false;
    component.refresh();
    frontCards!.classList.contains('hidden');
    backCards!.classList.contains('visible');
  });
});
