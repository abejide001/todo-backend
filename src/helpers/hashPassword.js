const bcrypt = require("bcrypt")

exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }