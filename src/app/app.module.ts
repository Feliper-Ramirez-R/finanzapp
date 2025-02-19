import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
registerLocaleData(localeEs, 'es')

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js',
      {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  },
  provideCharts(withDefaultRegisterables()),
  { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
