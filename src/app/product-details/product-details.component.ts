import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product;
  productQuantity: number=1;
  removeCart= false;
  // quantity= 1;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    const productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(result)
      this.productData= result;

      const cartData = localStorage.getItem('localCart');
      if(productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((items: product)=> productId== items.id.toString())
        if(items.length) {
          this.removeCart= true
        } else {
          this.removeCart= false
        }
      }
    })
  }

  handleQuantity(val: string) {
    if(this.productQuantity<20 && val==='plus') {
      this.productQuantity+= 1;
      // this.productQuantity = this.productQuantity + 1;
    } else if(this.productQuantity>1 && val==='min') {
      this.productQuantity-= 1;
    }
  }

  addToCart() {
    if(this.productData) {
      console.warn(this.productData)
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')) {
        // console.warn(this.productData)
        this.product.localAddToCart(this.productData);
        this.removeCart= true
      } else {
        let user = localStorage.getItem('user');
        const userId = user && JSON.parse(user).id
        console.warn(userId)
        const cartData: cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=> {
          if(result) {
            alert('product added in cart')
          }
        })
      }
    }
  }

  removeToCart(productId: number) {
    this.product.removeItemFromCart(productId);
    this.removeCart= false
  }

}
