import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  private readonly MAX_ITEMS: number = 1000;

  constructor(
    private api: ApiService,
  ) { }

  public getTracks(params: any): Observable<any> {
    let url = `/music/list?limit=${params.limit || this.MAX_ITEMS}`;

    if(params.playListId) url += '&playListId=' + params.playListId;

    return this.api.get(url, {});
  }

  public getTrackById(id: string): Observable<any> {
    return this.api.get(`/music/${id}`, {});
  }

  public createTrack(body: any): Observable<any> {
    return this.api.post('/music', { body });
  }

  public updateTrack(body: any): Observable<any> {
    return this.api.put('/music', { body });
  }

  public deleteTrack(id: string): Observable<any> {
    return this.api.delete('/music/' + id, {});
  }
}
