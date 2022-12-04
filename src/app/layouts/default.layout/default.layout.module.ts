import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default.layout.component';
import { RouterModule } from '@angular/router';
import { HomeModule } from 'src/app/routes/home/home.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HeaderModule,
    FooterModule
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class DefaultLayoutModule { }
