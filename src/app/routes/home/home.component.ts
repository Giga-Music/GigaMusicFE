import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/interfaces/playlist.interface';
import { Track } from 'src/app/interfaces/track.interface';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public isLoading: boolean = false;

  public playlists: Playlist[] = [];

  public tracks: Track[] = [];

  public search: any = '';

  constructor(
    private playlistsService: PlaylistsService,
    private tracksService: TracksService
  ){

  }

  ngOnInit(): void {
    this.getPlaylists();
    this.getTracks();
  }

  public onSearch(): void{
    this.getPlaylists();
  }

  public getPlaylists(): void{
    this.isLoading = true;
    const search = this.search;
    const sort = {key: 'rating', dir: 'desc'};

    this.playlistsService.getPlaylists({search}, sort).subscribe({
      next: (res: Playlist[]) => {
        this.playlists = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  public getTracks(): void {
    this.isLoading = true;

    this.tracksService.getTracks({limit: 5}).subscribe({
      next: (res: Track[]) => {
        this.tracks = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })

  }
}
