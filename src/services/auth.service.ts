import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieService) {
  }

  login(username: string): Observable<any> {
    this.cookieService.set('token', `JWT_${username}`);
/*
    this.isLoginSubject.next(true);
*/
    return this.isLoginSubject.asObservable();

  }

  logout(): Observable<any> {
    this.cookieService.delete('token')
    return this.isLoginSubject.asObservable();
  }

}
