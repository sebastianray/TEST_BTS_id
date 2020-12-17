const { User } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')
const { Op } = require('sequelize')

class UserController {

    static async getAllUser(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            })
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async signUp(req, res, next) {
        const { username, password, email, phone, country, city, postcode, name, address } = req.body
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                status: false,
                msg: 'Invalid request'
            })
        } else {
            try {
                const check = await User.findOne({
                    where: {
                        email: {
                            [Op.iLike]: '%' + email + '%'
                        }
                    }
                });
                if (check && email !== '') {
                    res.status(409).json({
                        status: 'false',
                        msg: 'Email is already registered'
                    });
                } else {
                    const user = await User.create({
                        username, password, email, phone, country, city, postcode, name, address
                    })
                    const access_token = tokenGenerator(user)
                    res.status(201).json({
                        status: 'Success',
                        email,
                        access_token,
                        username
                    })
                }
            } catch (err) {
                next(err)
            }
        }
    }

    static async signIn(req, res, next) {
        const { email, password } = req.body;
        const emailRegexp = /^[a-z_\-0-9\.\*\#\$\!\~\%\^\&\-\+\?\|]+@+[a-z\-0-9]+(.com)$/i;
        const isEmailFormat = emailRegexp.test(email);

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                status: false,
                msg: 'Invalid request'
            })
        } else if (email == '') {
            res.status(400).json({
                status: 'false',
                msg: 'Email is required'
            })
        }
        else if (!isEmailFormat) {
            res.status(400).json({
                status: 'false',
                msg: 'Invalid email format'
            })
        }
        else if (password === '') {
            res.status(400).json({
                status: 'false',
                msg: 'Password is required'
            })
        }
        else {
            try {
                const user = await User.findOne({
                    where: {
                        email: {
                            [Op.iLike]: '%' + email + '%'
                        }
                    }
                })
                if (!user) {
                    res.status(404).json({
                        status: 'false',
                        msg: 'User not found'
                    })
                } else if (decryptPwd(password, user.password) && user) {
                    const userData = await User.findOne({
                        where: {
                            id: user.id,
                        },
                        attributes: { exclude: ['password'] }
                    })
                    const access_token = tokenGenerator(user)
                    res.status(200).json({
                        status: 'Success',
                        email: userData.email,
                        access_token,
                        username: userData.username
                    })
                } else {
                    res.status(401).json({
                        status: 'false',
                        msg: 'Wrong password'
                    })
                }
            } catch (err) {
                next(err)
            }
        }
    }
}

module.exports = UserController;