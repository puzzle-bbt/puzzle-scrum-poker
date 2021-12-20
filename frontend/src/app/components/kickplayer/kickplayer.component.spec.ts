import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickplayerComponent } from './kickplayer.component';

describe('KickplayerComponent', () => {
  let component: KickplayerComponent;
  let fixture: ComponentFixture<KickplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KickplayerComponent ]
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
});
