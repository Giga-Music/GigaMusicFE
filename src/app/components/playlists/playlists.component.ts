import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from 'src/app/interfaces/playlist.interface';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  @Input('playlists') playlists: Playlist[] = [];

  constructor(
    private router: Router,
    private playlistsService: PlaylistsService
  ){
  }

  ngOnInit(): void {
  }

  public openPlaylist(id: string | undefined): void {
    this.router.navigate(['/playlist/'+id]);
  }

  public onRate(event: any, id: string): void{
    this.playlistsService.setRating(id, event.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
