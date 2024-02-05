import {Component, Input, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {ChangePasswordService} from "../services/change-password-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrl: './security.component.css'
})
export class SecurityComponent implements OnDestroy {
  @Input() isVisible!: boolean;
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;

  changePassword: FormGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      newPassword: new FormControl('', [Validators.required, this.checkPasswordStrength]),
      confirmPassword: new FormControl('', [Validators.required, this.checkPasswordStrength])
    },
    {
      validators: this.matchPasswords
    }
  );

  constructor(private  toastr: ToastrService, private changePasswordService: ChangePasswordService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  hide = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  get passwordInput() {
    return this.changePassword.get('password');
  }

  get newPasswordInput() {
    return this.changePassword.get('newPassword');
  }

  get confirmPasswordInput() {
    return this.changePassword.get('confirmPassword');
  }

  containsLetterA(control: AbstractControl): { [key: string]: any } | null {
    const value: string = control.value || '';
    if (value.indexOf('a') === -1) {
      return {'missingA': true};
    }
    return null;
  }


  matchPasswords(control: AbstractControl): { [key: string]: any } | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      return {'passwordMismatch': true};
    }
    return null;
  }

  getErrorMessage(): string {
    if (this.passwordInput?.hasError('required')) {
      return 'Password is required';
    } else if (this.passwordInput?.hasError('minlength')) {
      return 'Password must be at least 3 characters long';
    } else if (this.passwordInput?.hasError('missingA')) {
      return 'Password must contain the letter "a"';
    }
    return '';
  }

  getErrorMessageNewPassword(): string {
    if (this.newPasswordInput?.hasError('required')) {
      return 'Password is required';
    } else if (this.newPasswordInput?.hasError('tooShortPassword')) {
      return 'Must be at least 6 character long';
    }
    else if (this.newPasswordInput?.hasError('invalidPassword')) {
      return 'Password must contain capital and special sign';
    }
    return '';
  }

  getErrorMessageConfirmNewPassword(): string {
    if (this.confirmPasswordInput?.hasError('required')) {
      return 'Password is required';
    } else if (this.confirmPasswordInput?.hasError('tooShortPassword')) {
      return 'Must be at least 6 character long';
    }
    else if (this.confirmPasswordInput?.hasError('invalidPassword')) {
      return 'Password must contain capital and special sign';
    }
    return '';
  }

  handleSubmit() {
    this.isLoading = true;
    this.subscription.add(
      this.changePasswordService
        .changePassword(
          this.passwordInput?.value,
          this.newPasswordInput?.value,
          this.confirmPasswordInput?.value
        ).subscribe(
        (res) => {
          this.successToast()
          this.changePassword.reset();
          console.log('Success:', res);
        },
        err => {
          if(err.status === 406) {
            this.errorOldPasswordToast()
          }
          if(err.status === 409) {
            this.errorPasswordsToast()
          }
        },
        () => {
          this.isLoading = false;
        }
      )
    );
  }

  successToast() {
    this.toastr.success('Password changed succesfully','Success', {
      easing: 'ease-in',
      easeTime: 500,
      timeOut: 6000
    })
  }

  errorOldPasswordToast() {
    this.toastr.error('Old password provided does not match the current password','ERROR', {
      easing: 'ease-in',
      easeTime: 500,
      timeOut: 6000
    })
  }

  errorPasswordsToast() {
    this.toastr.error('New password does not match the confirmed password','ERROR', {
      easing: 'ease-in',
      easeTime: 500,
      timeOut: 6000
    })
  }

  check(): boolean {
    return !(this.passwordInput?.errors === null
      && this.newPasswordInput?.errors === null
      && this.confirmPasswordInput?.errors === null
      && this.changePassword?.errors === null);
  }

  private checkPasswordStrength(control: AbstractControl): { [key: string]: any } | null {
    const value: string = control.value || '';
    if (value.length < 6) {
      return { 'tooShortPassword': true };
    }
    // Funkcja pomocnicza sprawdzająca, czy ciąg znaków zawiera co najmniej jedną dużą literę
    const containsUpperCase = (value: string): boolean => /[A-Z]/.test(value);

// Funkcja pomocnicza sprawdzająca, czy ciąg znaków zawiera co najmniej jeden znak specjalny
    const containsSpecialCharacter = (value: string): boolean => /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (value.length < 6 || !containsUpperCase(value) || !containsSpecialCharacter(value)) {
      return { 'invalidPassword': true };
    }

    return null;
  }
}

