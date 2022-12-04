import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin.layout.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import {DockModule} from 'primeng/dock';

@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HeaderModule,
    FooterModule,
    DockModule
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule { }
