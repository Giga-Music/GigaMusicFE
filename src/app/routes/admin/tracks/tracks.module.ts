import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksComponent } from './tracks.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TracksEditCreateModule } from 'src/app/components/tracks-edit-create/tracks-edit-create.module';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [TracksComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    DynamicDialogModule,
    InputTextModule,
    ConfirmPopupModule,
    ProgressSpinnerModule,
    RouterModule.forChild([{ path: '', component: TracksComponent }]),
    TracksEditCreateModule,
  ],
  providers: [MessageService, DialogService, ConfirmationService, DynamicDialogConfig, DynamicDialogRef],
  exports: [TracksComponent],
})
export class TracksModule {}
