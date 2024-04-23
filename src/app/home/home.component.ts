import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  productData: undefined | product;
  productQuantity: number=1;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    //for real site there will be function which will decide popular products. But now we are doing this by limit 1st 3 products.
    this.product.popularProducts().subscribe((products)=>{
      // console.warn(products);
      this.popularProducts= products;
    });
    this.product.trendyProducts().subscribe((products)=>{
      this.trendyProducts= products;
    })
  }

  addToCartHome(val: any) {

    const productId= val;
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData= result;

      if(this.productData) {
        this.productData.quantity = this.productQuantity;
        if(!localStorage.getItem('user')) {
          this.product.localAddToCart(this.productData);
        }
      }
    })
  }


}
