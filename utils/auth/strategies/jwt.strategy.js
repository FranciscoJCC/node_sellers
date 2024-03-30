const { Strategy, ExtractJwt } = require('passport-jwt');
const { CONFIG } = require('./../../../config/config')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.JwtSecret
};

const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
});


module.exports = JwtStrategy;