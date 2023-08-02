import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosedCarouselItemComponent } from './chosed-carousel-item.component';

describe('ChosedCarouselItemComponent', () => {
  let component: ChosedCarouselItemComponent;
  let fixture: ComponentFixture<ChosedCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChosedCarouselItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChosedCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
