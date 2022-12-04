import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Playlist } from 'src/app/interfaces/playlist.interface';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { PlaylistsEditCreateComponent } from '../../../components/playlists-edit-create/playlists-edit-create.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit{

  public playlists: Playlist[] = [];

  public isLoading: boolean = true;

  public search: string = '';

  constructor(
    private playlistsService: PlaylistsService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmService: ConfirmationService
  ) {

  }

  ngOnInit(): void {
    this.getPlaylists();
  }

  public onSearch(): void{
    this.getPlaylists();
  }

  public getPlaylists(): void{
    this.isLoading = true;

    this.playlistsService.getPlaylists({search: this.search}).subscribe({
      next: (res: Playlist[]) => {
        this.playlists = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  public createPlaylist(): void{
    this.dialogService.open(PlaylistsEditCreateComponent, {
      header: 'Create playlist',
      width: '600px',
      data: {}
    }).onClose.subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public editPlaylist(playlist: Playlist): void{
    this.dialogService.open(PlaylistsEditCreateComponent, {
      header: `Edit playlist '${playlist.name}'`,
      width: '600px',
      data: {
        playlist: playlist
      }
    }).onClose.subscribe({
      next: (res) => this.handleOnClose(res)
    })
  }

  public deletePlaylist(id: string, event: any): void{
    this.confirmService.close();

    setTimeout(() => {
      this.confirmService.confirm({
        target: event.target,
        message: 'Are you sure you want to delete this playlist?',
        icon: 'pi pi-exclamation-triangle',
        closeOnEscape: true,
        accept: () => {
          this.playlistsService.deletePlaylist(id).subscribe({
            next: (res) => {
              this.getPlaylists();
              this.showMessage(true, 'Playlist successfully deleted');
            },
            error: (err) => {
              this.showMessage(false, 'Failed to delete playlist!');
            }
          })
        }
      })
    }, 200)
  }

  public handleOnClose(res: any): void{
    if(res) {
      this.getPlaylists()
    }
  }

  public showMessage(isSuccess: boolean, msg: string): void{
    this.messageService.add({severity: isSuccess ? 'success' : 'error', summary: isSuccess ? 'Success' : 'Error', detail: msg});
  }
}
