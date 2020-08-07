const userComparer = (user1, user2) => {
    if (user1.login < user2.login)
      return -1;
    if (user1.login > user2.login)
      return 1;
    return 0;
}

exports.getAutoSuggestUsers = async (loginSubstring, limit) =>
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