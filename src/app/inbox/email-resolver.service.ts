import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'
import { catchError, EMPTY } from 'rxjs';
import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;

    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');

        return EMPTY //* Is essentially an Observable that is already marked as complete, we can return EMPTY anytime that we are required to return an Observable, but if we dont really care what happens with it.
      })
    )

    // return {
    //   id: 'hehe',
    //   subject: 'hehe',
    //   text: 'hehe',
    //   to: 'hehe',
    //   from: 'hehe',
    //   html: 'hehe',
    // }
  }
}
