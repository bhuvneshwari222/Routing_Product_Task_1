import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Iproduct } from "../models/products";
import { ProductsService } from "./products.service";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<Iproduct[]>{
    private _productService = inject(ProductsService);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iproduct[]> {
        return this._productService.fetchProducts()
    }
}