import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

    private _authService = inject(AuthService)

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // console.log(route);
        let userRolesArr:Array<string> = route.data['userRoles'];
        let loggedInUser = this._authService.getUserRole()!;
        return userRolesArr.includes(loggedInUser);
    }
}