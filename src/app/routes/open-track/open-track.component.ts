import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Track } from 'src/app/interfaces/track.interface';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-open-track',
  templateUrl: './open-track.component.html',
  styleUrls: ['./open-track.component.scss'],
})
export class OpenTrackComponent implements OnInit, OnDestroy {

  public track: Track = {} as Track;

  public id: string = this.route.snapshot.params?.['id'];

  public isLoading: boolean = false;

  private readonly B64_HEAD: string = 'data:audio/mpeg;base64,';

  public subscription: Subscription | undefined;

  constructor(
    private tracksService: TracksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      this.router.navigate(['/']);
      return;
    }

    this.getTrackById();
  }

  public getTrackById(): void {
    this.isLoading = true;

    this.tracksService.getTrackById(this.id).subscribe({
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
