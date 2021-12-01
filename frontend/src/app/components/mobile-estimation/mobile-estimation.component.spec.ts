import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEstimationComponent } from './mobile-estimation.component';

describe('MobileEstimationComponent', () => {
  let component: MobileEstimationComponent;
  let fixture: ComponentFixture<MobileEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileEstimationComponent ]
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
