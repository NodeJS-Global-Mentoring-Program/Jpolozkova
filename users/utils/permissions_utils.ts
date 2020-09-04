import { Permissions } from '../utils/permissions';

exports.convertToInteger = (perms: Array<number>) =>
{
    if(perms.length == 0) return Permissions.None;
    let result: Permissions = Permissions.None;
    perms.forEach(element => {
        var perm: Permissions = (<any>Permissions)[element];
        result |= perm;
    });
    return result;
}
