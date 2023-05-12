const bcrypt = require("bcrypt");

const hashPwd = async (pwd) => {
  const salt = await bcrypt.genSalt(11);
  const hashed = await bcrypt.hash(pwd, salt);
  return hashed;
};

const comparePwd = async (pwd, bdpwd) => {
  const match = await bcrypt.compare(pwd, bdpwd) 
  
    return match
};

module.exports = { hashPwd, comparePwd };
