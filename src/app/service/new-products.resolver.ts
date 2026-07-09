import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ProductsService } from "./products.service";
import { Iproduct } from "../models/products";


@Injectable({
    providedIn: 'root'
})
export class NewProductsResolver implements Resolve<Iproduct | Iproduct[]>{
    private _productService = inject(ProductsService)

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iproduct> | Observable<Iproduct[]>{
        let productId = route.paramMap.get('prodID');
        if(productId){
            return this._productService.fetchProductById(productId);
        }else{
            return this._productService.fetchProducts();
        }
    }
}