import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEstimationComponent } from './mobile-estimation.component';
import {PokerGameService} from "../../services/poker-game.service";
import createSpyObj = jasmine.createSpyObj;
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {BehaviorSubject, of} from "rxjs";
import {Game, Player} from "../../models/model";

describe('MobileEstinationComponent', () => {
  let component: MobileEstimationComponent;
  let fixture: ComponentFixture<MobileEstimationComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let messengerServiceSpy: jasmine.SpyObj<BackendMessengerService>;
  let subjectMock: BehaviorSubject<Game>;
  let playerMock: BehaviorSubject<Player>;

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
    pokerGameServiceSpy = createSpyObj('PokerGameService', ['setSelectedCard', 'getRoundName', 'getAverage'], {'game$' : subjectMock});
    messengerServiceSpy = createSpyObj('BackendMessengerService', ['subscribe', 'sendMessage']);
    pokerGameServiceSpy.getAverage.and.returnValue(of(pokerGameServiceSpy.game$.value.average))
    pokerGameServiceSpy.setSelectedCard.and.returnValue(of())
    pokerGameServiceSpy.getRoundName.and.returnValue(of(pokerGameServiceSpy.game$.value.roundInfo))

    await TestBed.configureTestingModule({
      declarations: [MobileEstimationComponent],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
        {provide: BackendMessengerService, useValue: messengerServiceSpy}
      ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh', () => {
    component.refresh();
    expect(component.cardSelected == false);
    expect(pokerGameServiceSpy.getRoundName).toHaveBeenCalledTimes(1);
  });

  it('should getAverage', () => {
    component.getAverage();
    expect(pokerGameServiceSpy.getAverage).toHaveBeenCalledTimes(1);
  });

  it('should select card', () => {
    component.setSelectedCard("2");
    expect(component.cardSelected == true)
    expect(pokerGameServiceSpy.setSelectedCard).toHaveBeenCalledTimes(1);
  });
});
