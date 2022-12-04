import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  constructor(private api: ApiService) {}

  public getPlaylists(params: any, sort: any = null): Observable<any> {
    let url = `/playList/list?name=${params.search}`;

    if(sort) {
      url += `&sort=${sort.key}:${sort.dir}`;
    }

    return this.api.get(url, {});
  }

  public getPlaylist(id: string): Observable<any> {
    return this.api.get('/playList/' + id, {});
  }

  public createPlaylist(body: any): Observable<any> {
    return this.api.post('/playList', { body });
  }

  public updatePlaylist(body: any): Observable<any> {
    return this.api.put('/playList', { body });
  }

  public deletePlaylist(id: string): Observable<any> {
    return this.api.delete('/playList/' + id, {});
  }

  public setRating(id: string, rating: string): Observable<any> {
    return this.api.post(`/playList/${id}/addRating?rating=${rating}`, {});
  }
}
