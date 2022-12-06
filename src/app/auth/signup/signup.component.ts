import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [ //* Sync Validator
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUsername.validate]), //* Async Custom Validator
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  }, { validators: [this.matchPassword.validate] })

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    // console.log(this.authForm.controls.username);
  }

  onSubmit() {
    if (!this.authForm) return;

    this.authService.signup(this.authForm.value).subscribe({
      next: (response) => {//* Will be called anytime the observable emits a value
        //Navigate to inbox routes
        this.router.navigateByUrl('/inbox');
      },

      complete: () => {//* Will be called anytime the observable is completed successfully. This can be empty, as long as next() is handled

      },

      error: (error) => {//* Will be called anytime something is going wrong with the observable
        if (!error.status) {//* If error is no internet connection
          this.authForm.setErrors({ noConnection: true }) //* This noConnection: true is what we built in the custom validators
        } else this.authForm.setErrors({ unknownError: true })
      }
    })
  }

}
