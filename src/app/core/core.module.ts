import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadlyLoaded} from './module-import-guard';
import {LoggerService} from './service/logger.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConsoleLoggerService} from './service/console-logger.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '../auth/interceptor/auth.interceptor';
import {AuthService} from '../auth/service/auth.service';
import {AuthModule} from '../auth/auth.module';

const SERVICES = [{
  provide: LoggerService,
  useClass: ConsoleLoggerService
},
  AuthService
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AuthModule
  ],
  declarations: [],
  exports: [],
  providers: [...SERVICES, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadlyLoaded(parentModule, 'CoreModule');
  }
}
