const jwt = require('jsonwebtoken');
const secret = require('../config/auth_config').jwt_secret;
const models = require('../models');
const Member = models.Member;

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401)
            .json({
                msg: "No token provided"
            });
    }

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
};

const verifyAdmin = (req, res, next) => {
    console.log('verifiying adimin');
    const token = req.cookies.token;
    if (!token) {
        return res.status(401)
            .json({
                success: false,
                msg: "No token provided"
            });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err || !decoded || !decoded.id) {
            return res.status(400).json({
                success: false,
                msg: "Could not decode token"
            });
        }
        Member.findOne({
            where: {
                id: decoded.id
            }
        })
            .then(member => {
                console.log(member);
                if (member.role !== 'ADMIN') {
                    return res.status(403)
                        .json({
                            isAdmin: false
                        });
                } else if (member.role === 'ADMIN') {
                    next();
                }
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            });
    })

    const decoded = jwt.decode(token);
    
};

const authJwt = {
	verifyUser,
    verifyAdmin
};

module.exports = authJwt;