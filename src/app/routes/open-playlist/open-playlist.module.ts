import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenPlaylistComponent } from './open-playlist.component';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AudioModule } from 'src/app/components/audio/audio.module';

@NgModule({
  declarations: [
    OpenPlaylistComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    AudioModule,
    RouterModule.forChild([{ path: '', component: OpenPlaylistComponent }]),
  ],
  exports: [
    OpenPlaylistComponent
  ]
})
export class OpenPlaylistModule { }
