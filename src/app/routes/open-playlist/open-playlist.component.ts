import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/interfaces/playlist.interface';
import { Track } from 'src/app/interfaces/track.interface';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-open-playlist',
  templateUrl: './open-playlist.component.html',
  styleUrls: ['./open-playlist.component.scss'],
})
export class OpenPlaylistComponent implements OnInit, OnDestroy {
  public playlist: Playlist = {} as Playlist;

  public track: Track = {} as Track;

  public tracks: Track[] = [];

  public id: string = this.route.snapshot.params?.['id'];

  public trackId: string = '';

  public isLoading: boolean = false;

  private readonly B64_HEAD: string = 'data:audio/mpeg;base64,';

  public subsription: Subscription | undefined;

  constructor(
    private tracksService: TracksService,
    private playlistsService: PlaylistsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      this.router.navigate(['/']);
      return;
    }

    this.getPlaylist();
  }

  public getPlaylist(): void {
    this.isLoading = true;

    this.playlistsService.getPlaylist(this.id).subscribe({
      next: (res: Playlist) => {
        if (res && res.id) {
          this.playlist = res;

          this.getTracks();

          if (this.trackId) {
            this.getTrackById();
          }
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }

  public getTracks(): void {
    this.isLoading = true;

    this.tracksService.getTracks({ playListId: this.id }).subscribe({
      next: (res: Track[]) => {
        this.tracks = res;

        if (!this.trackId && this.tracks && this.tracks.length) {
          this.trackId = this.tracks[0].id || '';
          this.getTrackById();
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  public getTrackById(): void {
    this.isLoading = true;

    this.subsription = this.tracksService.getTrackById(this.trackId).subscribe({
      next: (res: Track) => {
        this.track = {} as Track;
        this.track = res;
        this.track.mediaFile = this.B64_HEAD + this.track.mediaFile;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  public onTrackEnd(): void {
    this.loadNextTrack();
  }

  public loadNextTrack(): void {
    const currIdx = this.tracks.findIndex((i: Track) => i.id === this.trackId);

    if (currIdx >= 0 && this.tracks[currIdx + 1]) {
      this.trackId = this.tracks[currIdx + 1].id + '';
      this.track.mediaFile = null;

      this.getTrackById();
    }
  }

  public onTrackClick(id: string): void {
    this.trackId = id;
    this.getTrackById();
  }

  public ngOnDestroy(): void {
    this.subsription?.unsubscribe();
  }
}
