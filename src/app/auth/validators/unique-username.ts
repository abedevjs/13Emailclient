import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../auth.service";



@Injectable({ //* The only reason we add this @Injectable is to enable the class UniqueUsername to use the dependency injection system
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

    constructor(private authService: AuthService) { }

    validate = (control: AbstractControl): any => {
        const { value } = control;

        return this.authService.usernameAvailable(value).pipe(
            map(() => null),
            catchError((err): any => {
                if (err.error.username) return of({ nonUniqueUsername: true });
                else return of({ noInternetConnection: true });
            })
        )
    }
}
