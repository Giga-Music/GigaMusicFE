import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'src/app/interfaces/track.interface';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit{

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
  }

  @Input('tracks') tracks: Track[] = [];

  public openTrack(id: string): void{
    this.router.navigate(['/track/'+id]);
  }
}
