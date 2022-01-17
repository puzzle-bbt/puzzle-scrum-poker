import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickplayerComponent } from './kickplayer.component';
import { Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;

describe('KickplayerComponent', () => {
  let component: KickplayerComponent;
  let fixture: ComponentFixture<KickplayerComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  routerSpy = createSpyObj('Router',
    ['navigate']);

  routerSpy.navigate.and.callThrough();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KickplayerComponent],
      providers: [
        {provide: Router, useValue: routerSpy},
      ]
    });

    fixture = TestBed.createComponent(KickplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button text', () => {
    const okButton = fixture.nativeElement.querySelector('button');
    expect(okButton.textContent).toEqual('OK');
  })

  it('should clickButton', () => {
    const okButton = fixture.nativeElement.querySelector('button');
    okButton.click();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/onboarding/']);
  });

});
