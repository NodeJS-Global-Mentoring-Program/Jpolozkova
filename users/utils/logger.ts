import winston from "winston";
import { ILogger } from "../interfaces/ilogger";

export class Logger  implements ILogger
{
  wLogger: any;
  constructor(){
	  this.configureLogger();
  }
  
  configureLogger = () => {
    this.wLogger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console()
      ]});
  };

  log = (message: string) =>
  {
    this.wLogger.log({level: 'info', message: `Custom winston looger:  ${message}`});
  }

  logError = (error: String) =>
  {
    this.wLogger.log({level: 'error', message: `Custom winston looger:  ${error}`});
  }
}

