import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IFairs } from 'src/app/models/fairs';
import { FairsService } from 'src/app/service/fairs.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-fairs-details',
  templateUrl: './fairs-details.component.html',
  styleUrls: ['./fairs-details.component.scss']
})
export class FairsDetailsComponent implements OnInit {
  fairId !: string;
  fairObj!: IFairs;

  constructor(
    private _routes: ActivatedRoute,
    private _router: Router,
    private _fairsService: FairsService,
    private _snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    this._routes.params.subscribe((param: Params) => {
      this.fairId = param['fairID'];
      if (this.fairId) {
        this._fairsService.fetchFairById(this.fairId)
          .subscribe({
            next: resp => {
              this.fairObj = resp;
            },
            error: err => {
              this._snackBar.openSnackBar(err.msg);
            }
          })
      }
    })
  }

}
