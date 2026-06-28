import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/models/users';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UsersService } from 'src/app/service/users.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userObj  !: Iuser;
  userId !: string;

  constructor(
    private _routes: ActivatedRoute,
    private _router: Router,
    private _userService: UsersService,
    private _snackBar: SnackbarService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._routes.params.subscribe(param => {
      this.userId = param['userID']
      if (this.userId) {
        this._userService.fetchUserById(this.userId)
          .subscribe({
            next: data => {
              this.userObj = data;
            },
            error: err => {
              this._snackBar.openSnackBar(err.msg);
            }
          })
      }
    })
  }

  onRemoveUser() {
    let config = new MatDialogConfig();
    config.data = `Are you sure, you want to remove this user details with id ${this.userId}`;
    config.width = '400px';
    config.disableClose = true;
    let dialogRef = this._matDialog.open(GetConfirmComponent, config)
    dialogRef.afterClosed().subscribe({
      next: resp => {
        if (resp) {
          this._userService.removeUser(this.userId)
            .subscribe({
              next: resp => {
                this._snackBar.openSnackBar(resp.msg);
                this._router.navigate(['/users'])
                this._userService.setFirstUserSub$.next(true)                
              },
              error: err => {
                this._snackBar.openSnackBar(err.msg)
              }
            })
        }
      },
      error: err => {
        this._snackBar.openSnackBar(err.msg);
      }
    })
  }

}
