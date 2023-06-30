import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, LayoutComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
