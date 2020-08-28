import { IUser } from "../interfaces/iuser";

const userComparer = (user1: IUser, user2: IUser) => {
    if (user1.login < user2.login)
      return -1;
    if (user1.login > user2.login)
      return 1;
    return 0;
}

exports.getAutoSuggestUsers = async (loginSubstring: String, limit: Array<IUser>) =>
{
    if(limit.length > 0)
    {
        let usersFiltered = limit.filter(item => {
            return item.login.toLowerCase().includes(loginSubstring.toLowerCase())
        })
        if(usersFiltered.length > 0)
            return usersFiltered.sort(userComparer);
    }
}