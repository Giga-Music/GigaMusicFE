import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminLayoutComponent } from './layouts/admin.layout/admin.layout.component';
import { DefaultLayoutComponent } from './layouts/default.layout/default.layout.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'playlists',
        loadChildren: () => import('./routes/admin/playlists/playlists.module').then(m => m.PlaylistsModule)
      },
      {
        path: 'tracks',
        loadChildren: () => import('./routes/admin/tracks/tracks.module').then(m => m.TracksModule)
      }
    ]
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'playlist/:id',
        loadChildren: () => import('./routes/open-playlist/open-playlist.module').then(m => m.OpenPlaylistModule)
      },
      {
        path: 'track/:id',
        loadChildren: () => import('./routes/open-track/open-track.module').then(m => m.OpenTrackModule)
      },
      {
        path: '',
        loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
