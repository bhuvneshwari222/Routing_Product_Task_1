import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/products';
import { ProductsService } from 'src/app/service/products.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId !: string;
  productObj !: Iproduct;

  constructor(
    private _routes: ActivatedRoute,
    private _router: Router,
    private _productService: ProductsService,
    private _matDialog: MatDialog,
    private _snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this._routes.params
      .subscribe(param => {
        this.productId = param['prodID'];
        if (this.productId) {
          this._productService.fetchProductById(this.productId)
            .subscribe({
              next: data => {
                this.productObj = data;
              },
              error: err => {
                console.log(err);
              }
            })
        }
      })

    // this.productId = this._routes.snapshot.paramMap.get('prodID')!
    // if (this.productId) {
    //   this._productService.fetchProductById(this.productId)
    //     .subscribe({
    //       next: data => {
    //         this.productObj = data;
    //       },
    //       error: err => {
    //         console.log(err);
    //       }
    //     })
    // }
  }

  onRemove() {
    let config = new MatDialogConfig()
    config.data = `Are you sure you wnt to remove this product with id ${this.productId}`;
    config.disableClose = true;
    config.width = '400px';
    let dialogRef = this._matDialog.open(GetConfirmComponent, config)
    dialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this._productService.removeProduct(this.productId)
              .subscribe({
                next: resp => {
                  this._snackBar.openSnackBar(resp.msg)
                  this._router.navigate(['products'])
                  this._productService.setFirstProductSub$.next(true)
                },
                error: err => {
                  this._snackBar.openSnackBar(err)
                }
              })
          }
        },
        error: err => {
          this._snackBar.openSnackBar(err);
        }
      })
  }

  redirectToEdit(){
    this._router.navigate(['edit'],{
      queryParamsHandling: 'preserve',
      relativeTo: this._routes
    })
  }

}
