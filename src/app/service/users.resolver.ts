import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Iuser } from "../models/users";
import { Observable } from "rxjs";
import { UsersService } from "./users.service";


@Injectable({
    providedIn: 'root'
})
export class UsersResolver implements Resolve<Iuser | Iuser[]>{

    private _userService = inject(UsersService)

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iuser | Iuser[]> {
        let userId = route.paramMap.get('userID');
        if(userId){
            return this._userService.fetchUserById(userId);
        }else{
            return this._userService.fetchUsersArr();
        }
    }
}