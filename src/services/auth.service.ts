import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

constructor() { }
  private hasToken(): boolean {
    return !!localStorage.getItem('isLogged');
  }

  login(username:string): void {
    localStorage.setItem('isLogged', `JWT_${username}`);
    this.isLoginSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('isLogged');
    this.isLoginSubject.next(false);
  }
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
