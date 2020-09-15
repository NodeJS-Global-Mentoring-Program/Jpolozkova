import { ILogger } from "../interfaces/ilogger";

class errorHandler {
    logger: ILogger;
	constructor(group: ILogger){
	  this.logger = group;
    }
    
    executeQuery  = async (query: Promise<any>, next: any, method: string, params: string) => {
        let _logger = this.logger;
        let q = await query.catch((error: Error) => {
            _logger.logError(`Method ${method} with parameters:${params} throws an exception: ${error}`);
            next(error)
          });
        return q;
    };
   }
   module.exports = errorHandler;

