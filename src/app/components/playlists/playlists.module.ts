import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlaylistsComponent],
  imports: [CommonModule, RouterModule, FormsModule, RatingModule],
  exports: [PlaylistsComponent],
})
export class PlaylistsModule {}
