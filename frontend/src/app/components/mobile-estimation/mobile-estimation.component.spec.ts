import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEstimationComponent } from './mobile-estimation.component';
import {PokerGameService} from "../../services/poker-game.service";
import createSpyObj = jasmine.createSpyObj;
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {BehaviorSubject, of} from "rxjs";
import {Game} from "../../models/model";

describe('MobileEstinationComponent', () => {
  let component: MobileEstimationComponent;
  let fixture: ComponentFixture<MobileEstimationComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let messengerServiceSpy: jasmine.SpyObj<BackendMessengerService>;
  let subjectMock: BehaviorSubject<Game>;

  beforeEach(async () => {
    subjectMock = new BehaviorSubject<Game>({
      gameKey: "0",
      iAmTableMaster: false,
      isGameRunning: false,
    }as Game)
    pokerGameServiceSpy = createSpyObj('PokerGameService', ['setSelectedCard', 'getRoundName', 'getAverage'], {'game$' : subjectMock});
    pokerGameServiceSpy.getRoundName.and.returnValue(of("Some round name"));
    messengerServiceSpy = createSpyObj('BackendMessengerService', ['subscribe']);

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
});
