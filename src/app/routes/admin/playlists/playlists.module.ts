import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PlaylistsEditCreateModule } from 'src/app/components/playlists-edit-create/playlists-edit-create.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [PlaylistsComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmPopupModule,
    RatingModule,
    ProgressSpinnerModule,
    RouterModule.forChild([{ path: '', component: PlaylistsComponent }]),
    PlaylistsEditCreateModule
  ],
  providers: [MessageService, DialogService, ConfirmationService, DynamicDialogConfig, DynamicDialogRef],
  exports: [PlaylistsComponent],
})
export class PlaylistsModule {}
