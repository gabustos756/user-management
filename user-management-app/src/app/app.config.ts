import { ApplicationConfig, importProvidersFrom, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(NgbModule),
  ],
};
export const config = signal({
  production: false,
  googleMapsApiKey: '',
  apiUrl: 'https://reqres.in/api',
});
