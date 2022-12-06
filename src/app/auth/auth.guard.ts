import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, skipWhile, take, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return false

    return this.authService.signedin$.pipe(
      skipWhile((value) => value === null),
      map((value) => value!),
      take(1),
      tap((authenticated) => {
        if (!authenticated) this.router.navigateByUrl('/');
      })
    );

    // Quick explanation based on my understanding :

    // You must return a type Observable<boolean OR UrlTree>. The problem is that take(1) returns an Observable<boolean OR null> since your value is of type <boolean OR null>. What the map will do is to explicitely cast the value into a boolean and return the correct type Observable<boolean> (in fact, it will returns a type Observable<boolean OR UrlTree> since this type is specified as a parameter of the function )

  }
}
