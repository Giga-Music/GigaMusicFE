import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TracksEditCreateComponent } from 'src/app/components/tracks-edit-create/tracks-edit-create.component';
import { Track } from 'src/app/interfaces/track.interface';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit{

  public tracks: Track[] = [];

  public isLoading: boolean = true;

  constructor(
    private tracksService: TracksService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private router: Router,
    private confirmService: ConfirmationService
  ) {

  }

  ngOnInit(): void {
    this.getTracks();
  }

  public getTracks(): void{
    this.isLoading = true;

    this.tracksService.getTracks({}).subscribe({
      next: (res: Track[]) => {
        this.tracks = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  public createTrack(): void{
    this.dialogService.open(TracksEditCreateComponent, {
      header: 'Create track',
      width: '600px',
      data: {}
    }).onClose.subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public editTrack(track: Track): void{
    this.dialogService.open(TracksEditCreateComponent, {
      header: `Edit track '${track.name}'`,
      width: '600px',
      data: {
        track: track
      }
    }).onClose.subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public deleteTrack(id: string, event: any): void{
    this.confirmService.close();

    setTimeout(() => {
      this.confirmService.confirm({
        target: event.target,
        message: 'Are you sure you want to delete this track?',
        icon: 'pi pi-exclamation-triangle',
        closeOnEscape: true,
        accept: () => {
          this.tracksService.deleteTrack(id).subscribe({
            next: (res) => {
              this.getTracks();
              this.showMessage(true, 'Track successfully deleted');
            },
            error: (err) => {
              this.showMessage(false, 'Failed to delete track!');
            }
          })
        }
      })
    }, 200)
  }

  public openTrack(track: Track): void {
    this.router.navigate(['/track/'+track.id]);
  }

  public handleOnClose(res: any): void{
    if(res) {
      this.getTracks()
    }
  }

  public showMessage(isSuccess: boolean, msg: string): void{
    this.messageService.add({severity: isSuccess ? 'success' : 'error', summary: isSuccess ? 'Success' : 'Error', detail: msg});
  }
}
