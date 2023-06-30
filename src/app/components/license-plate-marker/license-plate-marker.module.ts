import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { LicensePlateMarkerComponent } from './license-plate-marker.component';

@NgModule({
  declarations: [LicensePlateMarkerComponent, ButtonDirective],
  imports: [CommonModule],
  exports: [LicensePlateMarkerComponent],
})
export class LicensePlateMarkerModule {}
