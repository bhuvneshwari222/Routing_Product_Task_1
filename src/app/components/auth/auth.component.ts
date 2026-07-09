import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  allReadyHasAcc: boolean = false;
  loginForm !: FormGroup;
  signUpForm !: FormGroup;

  constructor(
    private _authService : AuthService,
    private _snackBar: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
    this.createLoginForm();
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      userRole: new FormControl('admin')
    })
  }

  get signUpControls(){
    return this.signUpForm.controls;
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl(null, [Validators.required])
    })
  }

  get logInControls(){
    return this.loginForm.controls;
  }

  onLogin(){
    if(this.loginForm.invalid){
      return this.loginForm.markAllAsTouched();
    }else{
      let details = this.loginForm.value;
      this._authService.login(details)
      .subscribe({
        next: resp =>{
          // console.log(resp); 
          this._snackBar.openSnackBar(resp.message);
          this._authService.saveToken(resp.token);
          this._authService.saveUserRole(resp.userRole);
          this._router.navigate(['home']);
        },
        error: err =>{
          // console.log(err);
          this._snackBar.openSnackBar(err.error.message);
        }
      })
      
    }
  }

  onSignUp(){
    if(this.signUpForm.invalid){
      return this.signUpForm.markAllAsTouched()
    }else{
      let userDetails = this.signUpForm.value;
      this._authService.signUp(userDetails)
      .subscribe({
        next: resp =>{
          this._snackBar.openSnackBar(resp.message);
          this.allReadyHasAcc = true;
        },
        error: err =>{
          this._snackBar.openSnackBar(err.error.message);
        }
      })
    }
  } 

}
