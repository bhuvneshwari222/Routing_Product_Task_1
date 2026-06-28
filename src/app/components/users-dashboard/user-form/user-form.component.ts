import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/models/users';
import { FormUtilityService } from 'src/app/service/form-utility.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  usersForm !: FormGroup;
  isInEditMode: boolean = false;
  countries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Japan",
    "China",
    "South Korea",
    "Singapore",
    "Malaysia",
    "Thailand",
    "Indonesia",
    "Philippines",
    "Vietnam",
    "Nepal",
    "Sri Lanka",
    "Bangladesh",
    "Pakistan",
    "Afghanistan",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Oman",
    "Kuwait",
    "South Africa",
    "Nigeria",
    "Egypt",
    "Kenya",
    "Brazil",
    "Argentina",
    "Mexico",
    "Russia",
    "Ukraine",
    "Turkey",
    "New Zealand",
    "Switzerland"
  ];
  editUserObj !: Iuser;
  userId !: string;

  constructor(
    private _userService: UsersService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _routes: ActivatedRoute,
    private _formUtility: FormUtilityService
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addSkillControl()
    this.isAddressSameHandler()
    this.permanentAddressHandler()
    this.patchUserDetails()
    //  console.log((this.f['address'].get('current') as FormGroup).controls);

  }

  createUserForm() {
    this.usersForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userRole: new FormControl('candidate'),
      isActive: new FormControl(true),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, Validators.required),
      experienceYears: new FormControl('1 to 3 years'),
      address: new FormGroup({
        current: new FormGroup({
          country: new FormControl('India'),
          state: new FormControl(null, [Validators.required]),
          city: new FormControl(null, [Validators.required]),
          zipcode: new FormControl(null, [Validators.required]),
        }),
        permanent: new FormGroup({
          country: new FormControl('India'),
          state: new FormControl(null, [Validators.required]),
          city: new FormControl(null, [Validators.required]),
          zipcode: new FormControl(null, [Validators.required]),
        })
      }),
      isAddressSame: new FormControl({ value: null, disabled: true}, Validators.required),
      skills: new FormArray([])
    })
  }

  get f() {
    return this.usersForm.controls
  }

  get skillsArr() {
    return this.f['skills'] as FormArray
  }

  get currentAddress() {
    return (this.f['address'].get('current') as FormGroup).controls;
  }

  get permanentAddress() {
    return (this.f['address'].get('permanent') as FormGroup).controls;
  }

  addSkillControl() {
    if (this.f['skills'].valid) {
      let control = new FormControl(null, Validators.requiredTrue);
      this.skillsArr.push(control);
    }
  }

  isAddressSameHandler() {
    this.f['address'].get('current')?.valueChanges
      .subscribe(changedValu => {
        if (this.f['address'].get('current')?.valid) {
          this.f['isAddressSame'].enable();
        } else {
          this.f['isAddressSame'].disable();
          this.f['isAddressSame'].reset();
        }
      })
  }

  permanentAddressHandler() {
    this.f['isAddressSame'].valueChanges
      .subscribe(resp => {
        if (resp) {
          let currentVal = this.f['address'].get('current')?.value
          this.f['address'].get('permanent')?.patchValue(currentVal)
          this.f['address'].get('permanent')?.disable()
        } else if (this.isInEditMode && !resp) {
          this.f['address'].get('permanent')?.enable();
          this.f['address'].get('permanent')?.patchValue(this.editUserObj.address.permanent);
        }
        else {
          this.f['address'].get('permanent')?.reset()
          this.f['address'].get('permanent')?.enable()
        }
      })
  }

  onAddUser() {
    if (this.usersForm.invalid) {
      this.usersForm.markAllAsTouched()
    } else {
      let newUser: Iuser = { ...this.usersForm.getRawValue(), userId: Date.now().toString() }
      this._userService.addUser(newUser)
        .subscribe({
          next: resp => {
            this._snackbar.openSnackBar(resp.msg)
            this._router.navigate(['/users']);
            this.usersForm.reset();
          },
          error: err => {
            this._snackbar.openSnackBar(err.msg)
          }
        })
    }
  }

  patchUserDetails() {
    this.userId = this._routes.snapshot.paramMap.get('userID')!
    if (this.userId) {
      this.isInEditMode = true;
      this._userService.fetchUserById(this.userId)
        .subscribe({
          next: resp => {
            this.editUserObj = resp;
            this.usersForm.patchValue(resp);
            this._formUtility.patchFormArr(resp.skills, this.skillsArr);
            if(resp.userRole === 'candidate'){
              this.usersForm.disable();
            }else{
              this.usersForm.enable();
            }
            if (this.f['address'].get('current')?.valid) {
              this.f['isAddressSame'].enable();
              this.f['address'].get('permanent')?.patchValue(resp.address.permanent);
            }
          },
          error: err => {
            this._snackbar.openSnackBar(err.msg);
          }
        })
    }
  }

  onUpdateUser() {
    if (this.usersForm.invalid) {
      this.usersForm.markAllAsTouched()
    } else {
      let updatedUser: Iuser = { ...this.usersForm.getRawValue(), userId: this.editUserObj.userId }
      this._userService.updateUser(updatedUser)
        .subscribe({
          next: resp => {
            this._router.navigate(['/users',this.userId],{
              queryParams: {
                userRole: resp.data.userRole
              }
            });
            this._snackbar.openSnackBar(resp.msg);
            this.usersForm.reset();
            this.isInEditMode = false;
          },
          error: err => {
            this._snackbar.openSnackBar(err);
          }
        })
    }
  }

}
