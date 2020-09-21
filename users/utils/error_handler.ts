import { ILogger } from "../interfaces/ilogger";

class errorHandler {
    logger: ILogger;
	constructor(group: ILogger){
	  this.logger = group;
    }
    
    executeQuery  = async (query: Promise<any>, next: any, method: string, params: string) => {
        let _logger = this.logger;
        console.log(query);
        if(query.catch){
          let q = await query.catch((error: Error) => {
            _logger.logError(`Error from common err hahdler: Method ${method} with parameters:${params} throws an exception: ${error}`);
            next(error)
          });
          return q;
        }
        try {
          return await query;
        }
        catch (ex)
        {
          _logger.logError(`Error from common err hahdler: Method ${method} with parameters:${params} throws an exception: ${ex}`);
          next(ex)
        }

    };
   }
   module.exports = errorHandler;

