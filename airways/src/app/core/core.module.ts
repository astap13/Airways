/* eslint-disable import/no-extraneous-dependencies */
import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    NgbDropdownModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
