import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginVigilanteGuard implements CanActivate {
  constructor(private cookieService: CookieService,private router:Router) {}

  redirect(flag:boolean){
    if (flag) this.router.navigate(['/dashboard']);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('token')
    this.redirect(cookie)
    return !cookie;
  }
}
