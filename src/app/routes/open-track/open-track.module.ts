import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenTrackComponent } from './open-track.component';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AudioModule } from 'src/app/components/audio/audio.module';

@NgModule({
  declarations: [
    OpenTrackComponent
  ],
  imports: [
    CommonModule,
    AudioModule,
    ProgressSpinnerModule,
    RouterModule.forChild([{ path: '', component: OpenTrackComponent }]),
  ],
  exports: [
    OpenTrackComponent
  ]
})
export class OpenTrackModule { }
