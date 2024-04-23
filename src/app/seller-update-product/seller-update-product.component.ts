import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;

  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router) {}

  ngOnInit(){
    let productId= this.route.snapshot.paramMap.get('id');
    console.warn(productId)
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data)
      this.productData= data;
    })
  }

  submit(data:product) {
    console.warn(data)
    if(this.productData) {
      data.id= this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result) {
        this.productMessage="Product has been updated"
      }
    });
    setTimeout(()=>{
      this.productMessage= undefined;
      this.router.navigate(['seller-home']);
    }, 3000);
  }
}
