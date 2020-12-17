const bcrypt = require('bcrypt')
const saltRound = Number(process.env.SALT_ROUND)

const encryptPwd = password => bcrypt.hashSync(password,saltRound)
const decryptPwd = (password, userPwd) => bcrypt.compareSync(password,userPwd)

module.exports = {
    encryptPwd, decryptPwd
}