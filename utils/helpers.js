const bcrypt = require('bcrypt');
const saltRounds = 10;


const hashPassword = (password)=>{
  return new Promise((resolve, reject)=>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
         resolve(
          {salt, hash}
         )
      });
    });
  })
};


const comparePassword = (password, hash) =>{
  return new Promise((resolve, reject)=>{
    bcrypt.compare(password, hash, function(err, result) {
      resolve(result)
    });
  });
};

const otpGenerator = ()=>{
  const _otp = Math.floor(100000 + 900000 * Math.random())
  return _otp;
};


module.exports ={
  hashPassword,
  otpGenerator,
  comparePassword
}