import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginUser, IregisterUser } from '../models/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_BASE_URL : string = environment.authBaseUrl;

  constructor(
    private _http : HttpClient
  ) { }

  login(userDetails: ILoginUser): Observable<any>{
    const LOGIN_URL = `${this.AUTH_BASE_URL}/api/auth/login`;
    return this._http.post(LOGIN_URL,userDetails)
  }

  signUp(userDetails: IregisterUser):Observable<any>{
    const SIGNUP_URL = `${this.AUTH_BASE_URL}/api/auth/register`;
    return this._http.post(SIGNUP_URL, userDetails)
  }

  saveToken(token: string){
    localStorage.setItem('token',token);
  }

  saveUserRole(userRole:string){
    localStorage.setItem('userRole',userRole);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  getUserRole(){
    return localStorage.getItem('userRole');
  }

  logOut(): Observable<any>{
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return of({
      msg: 'Logout Successfully !!!'
    })
  }

}
