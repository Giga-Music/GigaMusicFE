import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksComponent } from './tracks.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    TracksComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [
    TracksComponent
  ]
})
export class TracksModule { }
