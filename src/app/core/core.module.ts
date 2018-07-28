import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadlyLoaded} from './module-import-guard';
import {LoggerService} from './service/logger.service';
import {FormsModule} from '@angular/forms';
import {ConsoleLoggerService} from './service/console-logger.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../auth/interceptor/auth.interceptor';

const SERVICES = [{
  provide: LoggerService,
  useClass: ConsoleLoggerService
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule
  ],
  providers: [...SERVICES, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadlyLoaded(parentModule, 'CoreModule');
  }
}
