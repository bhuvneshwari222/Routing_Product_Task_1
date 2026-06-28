import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/models/users';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent implements OnInit {
  usersArr: Array<Iuser> = []

  constructor(
    private _userService: UsersService,
    private _snackBar: SnackbarService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this._userService.setFirstUserSub$.subscribe({
      next: resp =>{
        if(resp){
          this.setFirstUserAsSelected()
        }
      },
      error: err =>{
        this._snackBar.openSnackBar(err.msg);
      }
    })
  }

  getUsers() {
    this._userService.fetchUsersArr()
      .subscribe({
        next: resp => {
          this.usersArr = resp;
          this.setFirstUserAsSelected()
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  setFirstUserAsSelected() {
    this._router.navigate([this.usersArr[0].userId], {
      relativeTo: this._routes,
      queryParams: {
        userRole: this.usersArr[0].userRole
      }
    })
  }

  trackByUserID(index: number, user: Iuser) {
    return user.userId;
  }

}
