import { ComponentFixture, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;

import { ErrorComponent } from './error.component';
import {PokerGameService} from "../../services/poker-game.service";
import {BehaviorSubject} from "rxjs";
import {UserError} from "../../models/model";

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let pokerGameServiceSpy: jasmine.SpyObj<PokerGameService>;
  let subjectMock: BehaviorSubject<UserError>;

  beforeEach(async () => {
    subjectMock = new BehaviorSubject<UserError>({}as UserError)
    pokerGameServiceSpy = createSpyObj('PokerGameService', [], {'error$' : subjectMock});

    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
        {provide: PokerGameService, useValue: pokerGameServiceSpy},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
