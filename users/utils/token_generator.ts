import jwt from 'jsonwebtoken';

export class TokenGenerator {
    secret:string = "usergroupdemoapp";
    constructor(){
    }
    generate = async (payload: any): Promise<string> =>
    {
        let token = await jwt.sign(payload, this.secret);
        return token;
    }

    check_token = async (token: any): Promise<Boolean> =>
    {
        let result: Boolean = true;
        let isValid = await jwt.verify(token, this.secret, (err: any) => {
            console.log('invalid token');
            if(err)
                result = false;
        });
        return result;
    }
}