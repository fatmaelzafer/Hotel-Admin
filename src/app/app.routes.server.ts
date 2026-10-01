import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'login', renderMode: RenderMode.Server },
  { path: 'add-room', renderMode: RenderMode.Server },
  { path: 'add-room-type', renderMode: RenderMode.Server },
  { path: 'home', renderMode: RenderMode.Server },
  { path: 'rooms', renderMode: RenderMode.Server },
  { path: 'roomsearch/:checkOut/:checkIn/:guests', renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
