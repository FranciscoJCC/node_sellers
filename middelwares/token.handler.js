const { CONFIG } = require('./../config/config');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    //console.log('req:', req.headers.authorization);
    const token = req.headers.authorization;
    
    //Si no existe el token, mandamos error 
    if(!token) 
        throw boom.unauthorized('You do not have permission to perform this action');

    //Validamos token
    jwt.verify(token.slice(7), CONFIG.JwtSecret, (err, secret) => {
        //Si existe error al verificar 
        if(err)
            throw boom.unauthorized('You do not have permission to perform this action, verify permissions');

        req.user = secret;
        next();
    });
}

module.exports = verifyToken;