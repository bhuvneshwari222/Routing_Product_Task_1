import { Injectable } from '@angular/core';
import { Iproduct, IproductResp } from '../models/products';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsArr: Iproduct[] = [
    {
      prodID: 'P101',
      prodName: 'Gaming Keyboard',
      prodStatus: "Dispatched",
      canReturn: 1,
      description: 'This RGB gaming keyboard delivers a smooth typing experience.Mechanical keys provide fast response and excellent durability. Customizable lighting effects give an attractive gaming setup look.',
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
    },
    {
      prodID: 'P102',
      prodName: 'Wireless Headphones',
      prodStatus: 'Delivered',
      canReturn: 0,
      description: 'Experience immersive sound with these wireless headphones featuring active noise cancellation. The long-lasting battery and comfortable ear cushions make them perfect for travel, work, and entertainment.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
    },
    {
      prodID: 'P103',
      prodName: 'Bluetooth Speaker',
      prodStatus: "Dispatched",
      canReturn: 1,
      description: 'Enjoy powerful sound quality with this portable Bluetooth speaker. It offers deep bass and crystal-clear audio for music lovers. The compact design makes it easy to carry anywhere you go.',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1'
    },
    {
      prodID: 'P104',
      prodName: 'Smart Watch',
      prodStatus: "Inprogress",
      canReturn: 0,
      description: 'Track your fitness activities with this advanced smart watch. It monitors heart rate, sleep patterns, and daily step count accurately.The stylish design pairs perfectly with both casual and formal outfits.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
    },
    {
      prodID: 'P105',
      prodName: 'Laptop Backpack',
      prodStatus: "Delivered",
      canReturn: 0,
      description: 'This laptop backpack is designed for students and professionals. It comes with a spacious laptop compartment and multiple organizer pockets. The water- resistant material keeps your belongings safe during travel.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'
    },
    {
      prodID: 'P106',
      prodName: 'Samsung Smart TV',
      prodStatus: 'Inprogress',
      canReturn: 1,
      description: 'Enjoy stunning 4K Ultra HD picture quality with this Samsung Smart TV. It features built-in streaming apps, voice control, and immersive Dolby Digital sound for an exceptional home entertainment experience.',
      image: 'https://images.unsplash.com/photo-1643208589884-1aa3a8a67b67'
    }
  ];

  setFirstProductSub$ = new Subject<boolean>()
  constructor() { }

  fetchProducts(): Observable<Iproduct[]> {
    return of(this.productsArr);
  }

  fetchProductById(id: string): Observable<Iproduct> {
    let getProdObj = this.productsArr.find(p => p.prodID === id)!;
    return of(getProdObj);
  }

  createProduct(product: Iproduct): Observable<IproductResp<Iproduct>> {
    this.productsArr.push(product);
    return of({
      msg: `The new Product with id ${product.prodID} is created successfully!!!`,
      data: product
    })
  }

  updateProduct(updatedProd: Iproduct) {
    let getIndex = this.productsArr.findIndex(p => p.prodID === updatedProd.prodID)
    this.productsArr[getIndex] = updatedProd;
    return of({
      msg: `The product with id ${updatedProd.prodID} is updated successfully!!!`,
      data: updatedProd
    })
  }

  removeProduct(removeID: string): Observable<IproductResp<Iproduct>> {
    let getIndex = this.productsArr.findIndex(p => p.prodID === removeID)
    let removedProd = this.productsArr.splice(getIndex, 1);
    return of({
      msg: `The product with id ${removedProd[0].prodID} is removed successfully!!!`,
      data: removedProd[0]
    })
  }

 
}
