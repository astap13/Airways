import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassangersFormsComponent } from './passangers-forms.component';

describe('PassangersFormsComponent', () => {
  let component: PassangersFormsComponent;
  let fixture: ComponentFixture<PassangersFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassangersFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassangersFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
