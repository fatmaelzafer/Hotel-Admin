import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guest1Guard } from './guest1-guard';

describe('guest1Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guest1Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
