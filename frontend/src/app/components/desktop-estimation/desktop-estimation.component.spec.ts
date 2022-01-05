import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopEstimationComponent } from './desktop-estimation.component';
import {PokerGameService} from "../../services/poker-game.service";
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {BehaviorSubject, of} from "rxjs";
import {Game} from "../../models/model";
import createSpyObj = jasmine.createSpyObj;
import {ChangeDetectorRef} from "@angular/core";

describe('DesktopEstinationComponent', () => {
  let component: DesktopEstimationComponent;
  let fixture: ComponentFixture<DesktopEstimationComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let messengerServiceSpy: jasmine.SpyObj<BackendMessengerService>;
  let subjectMock: BehaviorSubject<Game>;
  let changeDetectorRefSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    subjectMock = new BehaviorSubject<Game>({
      gameKey: "0",
      iAmTableMaster: false,
      isGameRunning: false,
    }as Game)
    pokerGameServiceSpy = createSpyObj('PokerGameService', ['setSelectedCard', 'getAverage', 'getCardSvg'], {'game$' : subjectMock});
    pokerGameServiceSpy.getCardSvg.and.returnValue(of());
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
});
