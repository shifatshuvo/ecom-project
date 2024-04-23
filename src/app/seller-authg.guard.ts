import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from './service/seller.service';

export const sellerAuthgGuard: CanActivateFn = (route, state) => {

  if (localStorage.getItem('seller')) {
    return true;
  }

  const sellerService = inject(SellerService);
  return sellerService.isSellerLoggedIn;
};
