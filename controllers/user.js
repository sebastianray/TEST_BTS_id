const { User } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')
const { Op } = require('sequelize')

class UserController {

    static async list(req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async register(req, res, next) {
        const { email, password, confirm_password } = req.body
        const photo = req.file.path;
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
                } else if (confirm_password !== password) {
                    res.status(401).json({
                        status: 'false',
                        msg: 'Password is not the same'
                    });
                }
                else {
                    const user = await User.create({
                        email: email.toLowerCase(),
                        password,
                        photo,
                    })
                    const access_token = tokenGenerator(user)
                    res.status(201).json({
                        status: 'Success',
                        user,
                        access_token
                    })
                }
            } catch (err) {
                next(err)
            }
        }
    }

    static async login(req, res, next) {
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
                        userData,
                        access_token
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