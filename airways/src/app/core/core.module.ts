/* eslint-disable import/no-extraneous-dependencies */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    OverlayPanelModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
