import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEstinationComponent } from './mobile-estination.component';

describe('MobileEstinationComponent', () => {
  let component: MobileEstinationComponent;
  let fixture: ComponentFixture<MobileEstinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileEstinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEstinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
