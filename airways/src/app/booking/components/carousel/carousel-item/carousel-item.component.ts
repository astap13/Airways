import { Component, Input } from '@angular/core';

import { IActuallyFlights } from '../carousel.component';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
})
export class CarouselItemComponent {
  @Input() flight!: IActuallyFlights | null;
}
