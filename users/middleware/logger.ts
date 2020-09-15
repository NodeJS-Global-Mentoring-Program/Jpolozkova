import winston from "winston";
import { ILogger } from "../interfaces/ilogger";

class logger  implements ILogger
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
    this.wLogger.log({level: 'info', message: message});
  }

  logError = (error: String) =>
  {
    this.wLogger.log({level: 'error', message: error});
  }
}
module.exports = new logger();

