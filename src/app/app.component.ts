import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '13Emailclient';

  signedin$: BehaviorSubject<boolean | null>;
  // signedin$: BehaviorSubject<boolean>;
  // signedin$: boolean | null = false;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
    this.authService.checkAuth().subscribe(() => { });
  }

  ngOnInIt() { }
}
