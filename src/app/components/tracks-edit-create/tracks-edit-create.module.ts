import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksEditCreateComponent } from './tracks-edit-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [TracksEditCreateComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    ButtonModule,
    DynamicDialogModule,
  ],
  providers: [MessageService, DialogService],
  exports: [TracksEditCreateComponent],
})
export class TracksEditCreateModule {}
