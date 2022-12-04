import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Playlist } from 'src/app/interfaces/playlist.interface';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';

@Component({
  selector: 'app-playlists-edit-create',
  templateUrl: './playlists-edit-create.component.html',
  styleUrls: ['./playlists-edit-create.component.scss'],
})
export class PlaylistsEditCreateComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public playlist: Playlist = this?.config?.data?.playlist;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private playlistsService: PlaylistsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control(this.playlist?.name || '', [Validators.required, Validators.maxLength(180)]),
      description: this.fb.control(this.playlist?.description || '', [Validators.required, Validators.maxLength(180)]),
      imageUrl: this.fb.control(this.playlist?.imageUrl || '', [Validators.required, Validators.maxLength(180)]),
    });
  }

  public savePlaylist(): void{
    this.form.markAllAsTouched()
    if(!this.form.valid) return;

    this.form.disable();

    if(this.playlist && this.playlist.id) {
      this.updatePlaylist();
    }
    else{
      this.createPlaylist();
    }
  }

  public updatePlaylist(): void{
    const body: Playlist = this.form.value;
    body.id = this.playlist.id;

    this.playlistsService.updatePlaylist(body).subscribe({
      next: () => this.handleSuccess('Successfully updated!'),
      error: () => this.handleError('Error during update!')
    });
  }

  public createPlaylist(): void{
    this.playlistsService.createPlaylist(this.form.value).subscribe({
      next: () => this.handleSuccess('Successfully created!'),
      error: () => this.handleError('Error during create!')
    });
  }

  public handleSuccess(msg: string): void{
    this.form.enable();
    this.ref.close(true);
    this.showMessage(true, msg);
  }

  public handleError(msg: string): void{
    this.form.enable();
    this.showMessage(false, msg);
  }

  public cancel(): void{
    this.ref.close();
  }

  public showMessage(isSuccess: boolean, msg: string): void {
    this.messageService.add({
      severity: isSuccess ? 'success': 'error',
      summary: isSuccess ? 'Success!' : 'Error',
      detail: msg,
    });
  }
}
