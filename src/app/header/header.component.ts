import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string= '';
  cartItems = 0;

  constructor(
    private route: Router,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          // console.warn("inside seller areas")
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }

        } else if(localStorage.getItem('user')) {
          const userStore = localStorage.getItem('user');
          const userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType = 'user';

        } else {
          // console.warn("Outside of seller")
          this.menuType = 'default';
        }
      }
    });

    const cartData = localStorage.getItem('localCart');
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items)=> {
      this.cartItems= items.length;
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }

  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}

// login(){
//   this.route.navigate(['seller-auth']);
// }

// searchProduct(query:KeyboardEvent) {
//   if(query) {
//     const element= query.target as HTMLInputElement;
//     this.product.searchProducts(element.value).subscribe((result)=>{
//       if(result.length>5) {
//         result.length= 5;

//       }
//       this.searchResult= result;
//     })
//   }
// }
