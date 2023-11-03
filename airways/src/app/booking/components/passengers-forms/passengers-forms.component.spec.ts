import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersFormsComponent } from './passengers-forms.component';

describe('PassengersFormsComponent', () => {
  let component: PassengersFormsComponent;
  let fixture: ComponentFixture<PassengersFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengersFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengersFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
