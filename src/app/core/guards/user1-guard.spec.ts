import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { user1Guard } from './user1-guard';

describe('user1Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => user1Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
