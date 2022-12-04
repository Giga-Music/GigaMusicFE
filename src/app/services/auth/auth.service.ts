import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');

    return token && token.trim() != '' ? true : false;
  }

  public setAuth(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public authenticate(data: any): Observable<any> {
    return this.api.post('/authenticate', {
      body: data,
    });
  }
}
