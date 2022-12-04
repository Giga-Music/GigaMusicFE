import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { PlaylistsModule } from 'src/app/components/playlists/playlists.module';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TracksModule } from 'src/app/components/tracks/tracks.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    ProgressSpinnerModule,
    PlaylistsModule,
    TracksModule
  ],
  exports: [HomeComponent],
  providers: [PlaylistsService],
})
export class HomeModule {}
