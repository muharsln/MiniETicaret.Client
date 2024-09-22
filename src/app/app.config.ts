import { ApplicationConfig, ɵprovideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    ɵprovideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
