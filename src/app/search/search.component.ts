import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[];
  constructor(private activeRoute: ActivatedRoute, private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.sResult();
  }

  sResult() {
    this.activeRoute.paramMap.subscribe(map => {
        const q = map.get('query');
        if(q) {
          console.warn(q);
          q && this.product.searchProduct(q).subscribe((result)=>{
            console.warn(result)
            this.searchResult= result;
          });
        }
      });
  }
}


// this.router.navigate([`search/${query}`]);