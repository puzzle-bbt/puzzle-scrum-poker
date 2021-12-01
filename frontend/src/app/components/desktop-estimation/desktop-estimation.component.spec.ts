import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopEstimationComponent } from './desktop-estimation.component';

describe('DesktopEstinationComponent', () => {
  let component: DesktopEstimationComponent;
  let fixture: ComponentFixture<DesktopEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopEstimationComponent ]
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
