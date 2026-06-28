import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/models/products';
import { ProductsService } from 'src/app/service/products.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit {
  productsArr: Iproduct[] = [];

  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getProductsArr()
    this._productService.setFirstProductSub$.subscribe({
      next: resp =>{
        if(resp){
          this.setFirstProductAsSelected()
        }
      },
      error:err =>{
        this._snackbar.openSnackBar(err.msg);
      }
    })
  }

  getProductsArr() {
    this._productService.fetchProducts()
      .subscribe({
        next: data => {
          this.productsArr = data;
          this.setFirstProductAsSelected()
        },
        error: err => {
          console.log(err);
        }
      })
  }

  setFirstProductAsSelected() {
    this._router.navigate(['products',this.productsArr[0].prodID], {
      queryParams: {
        cr: this.productsArr[0].canReturn
      }
    })
  }

  trackByProdId(index: number, prod: Iproduct) {
    return prod.prodID;
  }

}
