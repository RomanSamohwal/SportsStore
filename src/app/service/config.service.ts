import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ConfigService {

  baseUrl = `http://localhost:3000`

  constructor(private http: HttpClient) {

  }

  private formatErrors = (error: any) => {
    return throwError(error.error);
  };

  get<T>(prop: { path: string, params: HttpParams, authorization?: { [key: string]: string } }): Observable<T> {
    return this.http
      .get(this.baseUrl + prop.path.toString(), {
        params: prop.params,
        headers: prop.authorization ? prop.authorization : {}
      })
      // @ts-ignore
      .pipe(catchError(this.formatErrors))
  }

  post<T>(prop: { patch: string, body: Object, authorization?: { [key: string]: string } }): Observable<T> {
    return this.http
      .post(this.baseUrl + prop.patch.toString(),
        prop.body,
        {headers: prop.authorization ? prop.authorization : {}})
      // @ts-ignore
      .pipe(catchError((err, caught) => {
        this.formatErrors(err)
        return caught
      }))
  }

  put<T>(prop: { patch: string, body: Object, authorization?: { [key: string]: string } }): Observable<T> {
    return this.http
      .put(this.baseUrl + prop.patch.toString(),
        prop.body,
        {headers: prop.authorization ? prop.authorization : {}})
      // @ts-ignore
      .pipe(catchError((err, caught) => {
        this.formatErrors(err)
        return caught
      }))
  }

  delete<T>(prop: { path: string}): Observable<T> {
    return this.http.delete(`${prop.path}`)
      // @ts-ignore
      .pipe(catchError((err, caught) => {
        this.formatErrors(err)
        return caught
      }))
  }

}
