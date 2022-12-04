import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected baseURL: string = environment.apiURL;

  protected headers: any = {
    Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`
  };

  constructor(
    private http: HttpClient,
  ) {  }

  private getRequest(data: any) {

    const headers = new HttpHeaders(Object.assign({}, this.headers));

    return {
      params: data.params ? data.params : {},
      headers: Object.assign(headers, data.headers ? data.headers : {}),
    };
  }

  public getEmptyInstants(url: string, data: any): Observable<any> {
    return new Observable((observer) => {
      const sub = this.http.get(
          url,
          this.getRequest(data)
      ).subscribe((res) => {
        observer.next(res);
        observer.complete();
      }, (e) => {
        observer.error(e);
      });

      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }


  public get(url: string, data: any): Observable<any> {
    return new Observable((observer) => {
      const sub = this.http.get(
          this.baseURL + url,
          this.getRequest(data)
      ).subscribe((res) => {
        observer.next(res);
        observer.complete();
      }, (e) => {
        observer.error(e);
      });

      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }

  public post(url: string, data: any): Observable<any> {
    return new Observable((observer) => {
      const sub = this.http.post(
          this.baseURL + url,
          data.body ? data.body : {},
          this.getRequest(data)
      ).subscribe((r) => {

        observer.next(r);
        observer.complete();

      }, (e) => {

        switch (e.status) {
          case 401:
            // Cookies.set('admin-token', '', -1);
            // location.href = '/login';
            observer.error(e);
            break;
          case 403:
            // this.router.navigate(['access-denied']).then(() => {
            // });
            observer.error(e);
            break;
          default:
            observer.error(e);
            break;
        }
        observer.complete();

      });

      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }

  public put(url: string, data: any): Observable<any> {
    return new Observable((observer) => {

      const sub = this.http.put(
          this.baseURL + url,
          data.body ? data.body : {},

          this.getRequest(data)
      ).subscribe((r) => {

        observer.next(r);
        observer.complete();

      }, (e) => {

        switch (e.status) {
          case 401:
            location.href = '/login';
            observer.error(e);
            break;
          case 403:
            observer.error(e);
            break;
          default:
            observer.error(e);
            break;
        }
        observer.complete();

      });
      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }

  public delete(url: string, data: any): Observable<any> {
    return new Observable((observer) => {

      const sub = this.http.delete(
          this.baseURL + url,
          this.getRequest(data)
      ).subscribe((r) => {
        observer.next(r);
        observer.complete();
      }, (e) => {

        switch (e.status) {
          case 401:
            location.href = '/login';
            observer.error(e);
            break;
          case 403:
            observer.error(e);
            break;
          default:
            observer.error(e);
            break;
        }
        observer.complete();

      });

      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }

}
