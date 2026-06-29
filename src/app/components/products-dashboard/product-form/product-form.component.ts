import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/products';
import { ProductsService } from 'src/app/service/products.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm !: FormGroup;
  isInEditMode: boolean = false;
  productID !: string;
  disabledBtn : boolean = false;

  constructor(
    private _prodService: ProductsService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createProductForm()
    this.patchProduct()
    this._routes.queryParams
    .subscribe(resp =>{
      if(resp['cr']== 0){
        this.productForm.disable();
        this.disabledBtn = true;
      }else{
        this.productForm.enable();
        this.disabledBtn = false;
      }
    })
  }

  patchProduct(){
    this.productID = this._routes.snapshot.paramMap.get('prodID')!;
    if (this.productID) {
      this.isInEditMode = true;
      this._prodService.fetchProductById(this.productID)
        .subscribe({
          next: resp => {
            this.productForm.patchValue(resp)
          },
          error: err => {
            this._snackbar.openSnackBar(err)
          }
        })
    }
  }

  createProductForm() {
    this.productForm = new FormGroup({
      prodName: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      prodStatus: new FormControl('Inprogress'),
      canReturn: new FormControl(0)
    })
  }

  get f() {
    return this.productForm.controls
  }

  onProductSubmit() {
    if (this.productForm.invalid) {
      return this.productForm.markAllAsTouched()
    } else {
      let newProdObj: Iproduct = { ...this.productForm.value, prodID: Date.now().toString() }
      this._prodService.createProduct(newProdObj)
        .subscribe({
          next: resp => {
            this.productForm.reset()
            this._router.navigate(['products'])
            this._snackbar.openSnackBar(resp.msg);
            this._prodService.setFirstProductSub$.next(true)
          },
          error: err => {
            this._snackbar.openSnackBar(err)
          }
        })
    }
  }

  onUpdateProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    } else {
      let updatedProduct = { ...this.productForm.value, prodID: this.productID }
      this._prodService.updateProduct(updatedProduct)
        .subscribe({
          next: resp => {
            this._snackbar.openSnackBar(resp.msg);
            this.productForm.reset();
            this.isInEditMode = false;
            this._router.navigate(['products',this.productID],{
              queryParams: {
                cr: resp.data.canReturn
              }
            });
          },
          error: err => {
            this._snackbar.openSnackBar(err)
          }
        })
    }
  }


}
