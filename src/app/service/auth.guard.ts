import { inject, Injectable, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{

//Home --------> ['buyer','admin','superAdmin']
//Users--------> ['admin','superAdmin']
//Products-----> ['buyer','admin','superAdmin']
//fairs--------> ['superAdmin']

    private _authService = inject(AuthService);
    private _router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(!!this._authService.getToken()){
            return true;
        }else{
            return this._router.createUrlTree(['']);
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this._authService.getToken()){
            return true;
        }else{
            return this._router.createUrlTree(['']);
        }
    }
}