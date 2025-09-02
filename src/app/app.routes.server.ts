import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Public static pages → prerender
  { path: 'auth/login', renderMode: RenderMode.Prerender },
  { path: 'auth/register', renderMode: RenderMode.Prerender },
  { path: 'auth/forget-password', renderMode: RenderMode.Prerender },

  // Auth verification page → server (needs user/session)
  { path: 'auth/verfication', renderMode: RenderMode.Server },

  // Protected or dynamic routes → always server-render
  { path: '', renderMode: RenderMode.Server },
  { path: 'owner/**', renderMode: RenderMode.Server },
  { path: 'company/**', renderMode: RenderMode.Server },

  // Wildcard / 404 → also server-render
  { path: '**', renderMode: RenderMode.Server },
];
