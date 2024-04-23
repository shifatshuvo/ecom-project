import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

const api = 'http://localhost:3000/products';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) { }
  addProduct(data:product) {
    return this.http.post(api, data);
  }

  list() {
    return this.http.get<product[]>(api);
  }

  deleteProduct(id:number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id:string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product:product) {
    console.warn(product)
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=4');
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=');
  }

  searchProduct(query:string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    const localCart = localStorage.getItem('localCart');
    if(!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData= JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    const cartData= localStorage.getItem('localCart');
    if(cartData) {
      let items: product[]= JSON.parse(cartData);
      items = items.filter((items: product)=>productId !== items.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart/', cartData);
  }

  getCartList(userID: number) {
    return this.http.get<product[]>('http://localhost:3000/cart?userId='+userID,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body) {
        this.cartData.emit(result.body);
      }
      
    });
  }
}
