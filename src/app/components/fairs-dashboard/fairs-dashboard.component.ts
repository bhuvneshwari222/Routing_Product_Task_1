import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFairs } from 'src/app/models/fairs';
import { FairsService } from 'src/app/service/fairs.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-fairs-dashboard',
  templateUrl: './fairs-dashboard.component.html',
  styleUrls: ['./fairs-dashboard.component.scss']
})
export class FairsDashboardComponent implements OnInit {
  fairsArr: IFairs[] = []

  constructor(
    private _fairsService: FairsService,
    private _snackBar: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getFairsArr()
  }

  getFairsArr() {
    this._fairsService.fetchFairsArr()
      .subscribe({
        next: resp => {
          this.fairsArr = resp;
          this._router.navigate(['fairs',resp[0].fairId])
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  trackById(index: number, fair: IFairs) {
    return fair.fairId;
  }

}
