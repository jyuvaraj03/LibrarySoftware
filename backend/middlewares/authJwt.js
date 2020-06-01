const jwt = require('jsonwebtoken');
const secret = require('../config/auth_config').jwt_secret;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
        console.log('really?');
        return res.status(403)
            .json({
                msg: "No token provided"
            });
    }
    console.log('before jwt');

    try {
        jwt.verify(token, secret);
        next();
    } catch(err) {
        console.log('errored at jwt verify', err);
    }
    /*jwt.verify(token, secret, (err, decoded) => {
        console('kya bro');
        if (err) {
            return res.status(401)
                .json({
                	msg: "Unauthorised"
                });
        }
        req.userId = decoded.id;
        console('verified, going next', req.userId)
        next();
    })*/
}

const authJwt = {
	verifyToken
};

module.exports = authJwt;