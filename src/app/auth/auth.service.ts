import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'https://api.angular-email.com';

  signedin$ = new BehaviorSubject<boolean | null>(null); //* the $ sign tells you that it is an Observable
  // signedin$ = new BehaviorSubject(false); //* the $ sign tells you that it is an Observable

  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) { //* This returns a PROMISE/OBSERVABLE, whoever call this function must .subscribe() or handle/catchError.
    return this.http.post<UsernameAvailableResponse>(`${this.URL}/auth/username`, {//* POST request always need a body{} in the second argument.
      username: username
    })
  }

  signup(credentials: any) { //* This returns a PROMISE/OBSERVABLE, whoever call this function must .subscribe() or handle/catchError.
    // return this.http.post<SignupResponse>(`${this.URL}/auth/signup`, credentials, { withCredentials: true }).pipe(
    return this.http.post<SignupResponse>(`${this.URL}/auth/signup`, credentials).pipe(//* If user's username/password is unacceptable, this line will not be executed.
      tap((response) => {
        this.signedin$.next(true);
        this.username = response.username;
      })
    )
  }

  checkAuth() {
    // return this.http.get(`${this.URL}/auth/signedin`, { withCredentials: true }).pipe(
    return this.http.get<SignedinResponse>(`${this.URL}/auth/signedin`).pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    )
  }

  signout() {
    return this.http.post(`${this.URL}/auth/signout`, {}).pipe(
      tap(() => this.signedin$.next(false))
    )
  }

  signin(credentials: any) {//* This returns a PROMISE/OBSERVABLE, whoever call this function must .subscribe() or handle/catchError.
    return this.http.post<SigninResponse>(`${this.URL}/auth/signin`, credentials).pipe(
      tap(({ username }) => {//* If user's username/password is incorrect, this line will not be executed.
        this.signedin$.next(true);
        this.username = username
      })
    )
  }


}

