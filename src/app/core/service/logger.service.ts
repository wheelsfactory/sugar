import {Injectable} from '@angular/core';

export interface Logger {
  info: any;
  warn: any;
  error: any;
}

@Injectable()
export class LoggerService implements Logger {
  error: any;
  info: any;
  warn: any;


  constructor() {
  }

  invokeLoggerMethod(type: string, args?: any): void {
  }
}
