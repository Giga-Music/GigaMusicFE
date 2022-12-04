import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Playlist } from 'src/app/interfaces/playlist.interface';
import { Track } from 'src/app/interfaces/track.interface';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-tracks-edit-create',
  templateUrl: './tracks-edit-create.component.html',
  styleUrls: ['./tracks-edit-create.component.scss'],
})
export class TracksEditCreateComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public track: Track = this.config?.data?.track || ({} as Track);

  public playlists: Playlist[] = [];

  public isLoading: boolean = false;

  private readonly B64_HEAD: string = 'data:audio/mpeg;base64,';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private tracksService: TracksService,
    private playlistsService: PlaylistsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.track && this.track.id) {
      this.getTrackById(this.track.id);
    }

    this.createForm();
    this.getPlaylists();
  }

  public createForm(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(180),
      ]),
      description: this.fb.control('', [
        Validators.required,
        Validators.maxLength(180),
      ]),
      imageUrl: this.fb.control('', [
        Validators.required,
        Validators.maxLength(180),
      ]),
      file: this.fb.control('', [Validators.required]),
      playLists: this.fb.control('', [Validators.required]),
    });
  }

  public getTrackById(id: string): void {
    this.isLoading = true;

    this.tracksService.getTrackById(id).subscribe({
      next: (res: Track) => {
        this.track = res;
        this.track.mediaFile = this.B64_HEAD + this.track.mediaFile;

        this.form.patchValue({
          name: res.name,
          imageUrl: res.imageUrl,
          description: res.description,
          playLists: this.mapPlaylists(res.playLists || []),
          file: this.base64ToFile(res.mediaFile, this.getFileNameMp3(res.name)),
        });

        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  public saveTrack(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.form.disable();

    if (this.track && this.track.id) {
      this.updateTrack();
    } else {
      this.createTrack();
    }
  }

  public updateTrack(): void {
    const body: Track = this.form.value;
    body.id = this.track.id;

    this.tracksService.updateTrack(this.getFormData(body)).subscribe({
      next: () => this.handleSuccess('Successfully updated!'),
      error: () => this.handleError('Error during update!'),
    });
  }

  public createTrack(): void {
    this.tracksService
      .createTrack(this.getFormData(this.form.value))
      .subscribe({
        next: () => this.handleSuccess('Successfully created!'),
        error: () => this.handleError('Error during create!'),
      });
  }

  public mapPlaylists(playlists: Playlist[]): string[] {
    return playlists ? playlists.map((p) => p.id || '') : [];
  }

  public getFileNameMp3(name: string): string {
    return name.trim().split(' ').join('_').toLocaleLowerCase() + '.mp3';
  }

  public getPlaylists(): void {
    this.playlistsService.getPlaylists({search: ''}).subscribe({
      next: (res: Playlist[]) => {
        this.playlists = res;
      },
      error: (err) => {},
    });
  }

  public getFormData(data: any): FormData {
    const form_data = new FormData();

    for (const key in data) {
      form_data.append(key, data[key]);
    }

    return form_data;
  }

  public handleSuccess(msg: string): void {
    this.form.enable();
    this.ref.close(true);
    this.showMessage(true, msg);
  }

  public handleError(msg: string): void {
    this.form.enable();
    this.showMessage(false, msg);
  }

  public cancel(): void {
    this.ref.close();
  }

  public showMessage(isSuccess: boolean, msg: string): void {
    this.messageService.add({
      severity: isSuccess ? 'success' : 'error',
      summary: isSuccess ? 'Success!' : 'Error',
      detail: msg,
    });
  }

  public uploadFile(event: any): void {
    if (event && event.files && event.files.length) {
      this.form.get('file')?.patchValue(event.files[0]);

      // Listen to song after select
      this.fileToBase64(event.files[0], (base64: string) => {
        this.track.mediaFile = base64;
      });
    }
  }

  public base64ToFile(base64String: any, filename: string): File | null {
    try {
      const arr = base64String.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const file = new File([u8arr], filename, { type: mime });

      return file;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public fileToBase64(file: File, cb: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  public clearFile(event: any): void {
    this.form.get('file')?.patchValue(null);
    this.track.mediaFile = null;
  }
}
