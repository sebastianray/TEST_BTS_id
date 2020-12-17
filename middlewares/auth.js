const { tokenVerifier } = require("../helpers/jwt");

const authorization = (req, res, next) => {
    console.log("Authorization works!");

    const { access_token } = req.headers;

    if (!access_token) {
        return res.status(404).json({
            msg: "Token not found",
        });
    } else {
        try {
            const decode = tokenVerifier(access_token);
            req.userData = decode;
            next();
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = {
    authorization
}