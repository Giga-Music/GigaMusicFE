import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsEditCreateComponent } from './playlists-edit-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [PlaylistsEditCreateComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DynamicDialogModule,
  ],
  providers: [MessageService, DialogService],
  exports: [PlaylistsEditCreateComponent],
})
export class PlaylistsEditCreateModule {}
