const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { Strategy } = require('passport-local');
const SellerService = require('../../../services/sellers.service');

const service = new SellerService();

const LocalStrategy = new Strategy({
        usernameField : 'email',
        passwordField : 'password'
    }, 
    async (email, password, done) => {
        try {
            const user = await service.findByEmail(email);

            //Si el usuario no existe
            if(!user)
                done(boom.unauthorized(), false);

            //Comparamos contraseñas
            const isMatch = await bcrypt.compare(password, user.password);

            //Constraseñas incorrectas
            if(!isMatch)
                done(boom.unauthorized(), false);

            //Eliminamos el password de la respuesta 
            delete user.dataValues.password;

            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;