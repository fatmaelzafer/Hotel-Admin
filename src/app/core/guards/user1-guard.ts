import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const user1Guard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    return sessionStorage.getItem('userToken') !== null;
  }

  return false;
};
