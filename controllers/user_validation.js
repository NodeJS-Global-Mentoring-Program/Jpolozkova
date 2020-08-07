const validateFieldExistance = (data) =>
{
  if(data.hasOwnProperty('id') &&
    data.hasOwnProperty('login') &&
    data.hasOwnProperty('password') &&
    data.hasOwnProperty('age') &&
    data.hasOwnProperty('isDeleted'))
      return true;
  return false;  
}

const validatePwd = (pwd) =>
{
  let pattern = /^[0-9a-zA-Z]+$/;
  if(pwd.match(pattern))
      return true;
  return false;  
}

const validatePwd = (pwd) =>
{
  let pattern = /^[0-9a-zA-Z]+$/;
  if(pwd.match(pattern))
      return true;
  return false;  
} 

const validateAge = (age) =>
{
  if(age >= 3 || age <= 130)
      return true;
  return false;  
} 

const validate = (req, res, next) => {
  let errorMessage = "";
  if(!validateFieldExistance(req.body))
    errorMessage = "All fields are requared: id, login, password, age, isDeleted;";
  if(!validatePwd(req.body.password))
    errorMessage = "Password must contain letters and numbers;";
  if(!validateAge(req.body.age))
    errorMessage = "User’s age must be between 4 and 130;";
  next();
}

module.exports = userValidatior;