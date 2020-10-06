import { IUserDAL } from "../interfaces/iuserdal";
import { TokenGenerator } from "../utils/token_generator";

export class LoginService {
	userDAL: IUserDAL;
	constructor(user: IUserDAL){
	  this.userDAL = user;
	}

	async doLogin(login: string, password: string) : Promise<string>
	{	
		let isCorrectLogin = await this.userDAL.checkLogin(login, password);
	
		if(isCorrectLogin)
		{
			let tGenerator = new TokenGenerator();
			return tGenerator.generate({"login": login});
		}
		return "";
	}
}