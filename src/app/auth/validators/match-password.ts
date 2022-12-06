import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormGroup, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root' }) //* The only reason we add this @Injectable is to enable the class MatchPassword to use the dependency injection system
export class MatchPassword implements Validators {

    //* Argumennya bisa di isi 3: formGroup: FormGroup, formControl: FormControl atau control: AbstractControl (can be either FormGroup or FormControl )
    validate(formGroup: AbstractControl) {

        const { password, passwordConfirmation } = formGroup.value;

        if (password === passwordConfirmation) return null;
        else return { passwordDontMatch: true }
    }
}
