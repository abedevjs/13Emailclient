import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { filter, Observable, tap } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //* This here is like MIDDLEWARE, we modify our Request inside modifiedReq
    const modifiedReq = request.clone({
      withCredentials: true
    });

    return next.handle(modifiedReq)


    //* This next.handle() is an Observable, so we chain pipe() on it. 
    //* This is where we can modify Response
    // return next.handle(modifiedReq).pipe(
    //   filter((val) => val.type === HttpEventType.Response),
    //   tap((val) => {
    //     // if (val.type === HttpEventType.Sent)
    //     //   console.log('Request was sent to server');
    //     // if (val.type === HttpEventType.Response)
    //     //   console.log('Got a response from API', val);

    //     console.log('Sent the request');
    //   })
    // )
  }
}
