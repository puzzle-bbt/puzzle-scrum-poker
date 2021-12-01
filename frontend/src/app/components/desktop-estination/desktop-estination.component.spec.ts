import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopEstinationComponent } from './desktop-estination.component';

describe('DesktopEstinationComponent', () => {
  let component: DesktopEstinationComponent;
  let fixture: ComponentFixture<DesktopEstinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopEstinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopEstinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
