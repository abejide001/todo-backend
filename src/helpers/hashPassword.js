const bcrypt = require("bcryptjs")

exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }