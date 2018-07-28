import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {environment} from '../../../environments/environment';

export let isDebugMode = environment.production;

@Injectable()
export class ConsoleLoggerService implements LoggerService {

  constructor() {
  }

  get error(): any {
    if (isDebugMode) {
      return console.error.bind(console);
    }
  }

  get info(): any {
    if (isDebugMode) {
      return console.info.bind(console);
    }
  }

  get warn(): any {
    if (isDebugMode) {
      return console.warn.bind(console);
    }
  }

  invokeLoggerMethod(type: string, args?: any): void {
    const logFn: Function = (console)[type] || console.log;
    logFn.apply(console, [args]);
  }
}
