import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickplayerComponent } from './kickplayer.component';
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {PokerGameService} from "../../services/poker-game.service";
import {BehaviorSubject, of} from "rxjs";
import {Game, Player} from "../../models/model";
import createSpyObj = jasmine.createSpyObj;

describe('KickplayerComponent', () => {
  let component: KickplayerComponent;
  let fixture: ComponentFixture<KickplayerComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  routerSpy = createSpyObj('Router',
    ['navigate']);

  routerSpy.navigate.and.callThrough();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KickplayerComponent ],
      providers: [
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KickplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button text', () => {
    const kickPlayerComponent: DebugElement = fixture.debugElement;
    const okButton = kickPlayerComponent.query(By.css('button'));
    const okButtonHtml: HTMLElement = okButton.nativeElement;
    expect(okButtonHtml.textContent).toEqual('OK');
  })

  it('should clickButton',  () => {
    const kickPlayerComponent: DebugElement = fixture.debugElement;
    const okButton = kickPlayerComponent.query(By.css('button'));
    const okButtonHtml: HTMLElement = okButton.nativeElement;

    let navigateSpy = spyOn(component, "navigateToHome");
    okButtonHtml.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledTimes(1);

  });

});
