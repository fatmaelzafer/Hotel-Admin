import { Routes } from '@angular/router';
import { guest1Guard } from './core/guards/guest1-guard';
import { user1Guard } from './core/guards/user1-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    loadComponent: () => import('./core/layouts/components/guest-layout/guest-layout.component').then((c) => c.GuestLayoutComponent),
    canActivate: [guest1Guard], // ← canMatch بدل canActivate
    children: [
      { path: 'login', loadComponent: () => import('./core/auth/login/login.components').then((c) => c.LoginComponents) },
    ],
  },

  {
    path: '',
    loadComponent: () => import('./core/layouts/components/user-layout/user-layout.component').then((c) => c.UserLayoutComponent),
    canActivate: [user1Guard], // ← canMatch بدل canActivate
    children: [
      {
        path: '',
        loadComponent: () => import('./core/layouts/components/userview/userview/userview').then((c) => c.Userview),
        children: [
          { path: 'home', loadComponent: () => import('./features/pages/components/home/home.component').then((c) => c.HomeComponent) },
          { path: 'add-room', loadComponent: () => import('./features/pages/components/add-room/add-room').then((c) => c.AddRoom) },
          { path: 'add-room-type', loadComponent: () => import('./features/pages/components/add-room-type/add-room-type').then((c) => c.AddRoomType) },
        ],
      },
      {
        path: '',
        loadComponent: () => import('./core/layouts/components/userroom/userrooms/userrooms').then((c) => c.Userrooms),
        children: [
          { path: 'rooms', loadComponent: () => import('./features/pages/components/rooms/rooms.page').then((c) => c.RoomsPage) },
        ],
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
