import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerFormCardComponent } from './passenger-form-card.component';

describe('PassengerFormCardComponent', () => {
  let component: PassengerFormCardComponent;
  let fixture: ComponentFixture<PassengerFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengerFormCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
