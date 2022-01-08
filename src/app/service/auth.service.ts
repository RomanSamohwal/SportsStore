import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private rest: RestService) {

  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.rest.authenticate(username, password);
  }

  get authenticated(): boolean {
    return this.rest.getAuthorization() != null;
  }

  clear() {
    this.rest.clearStorage()
  }
}
