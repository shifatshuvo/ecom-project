import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sellerAuthgGuard } from './seller-authg.guard';

describe('sellerAuthgGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sellerAuthgGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
