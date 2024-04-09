const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CONFIG } = require('../config/config');
const SellerService = require('./sellers.service');
const MailService = require('./mail.service');

const service = new SellerService();
const mailService = new MailService();

class AuthService {
    
    //Obtenemos el usuario y validamos email y password
    async getUser(email, password){
        const user = await service.findByEmail(email);

        //Si el usuario no existe
        if(!user)
            throw boom.unauthorized();

        const isMatch = await bcrypt.compare(password, user.password);

        //Constraseñas incorrectas
        if(!isMatch)
            throw boom.unauthorized();
        
        //Eliminamos el password de la respuesta 
        delete user.dataValues.password;

        return user;
    }

    //Firmamos un token
    signToken(user){
        const payload = {
            sub: user.id,
            role: 'seller'
        };

        const token = jwt.sign(payload, CONFIG.JwtSecret);

        return {
            user,
            token
        }
    }

    //Restablecimiento de contraseña, envio de correos 
    async sendRecovery(email){
        //Buscamos el usuario con el email
        const seller = await service.findByEmail(email);

        if(!seller){
            throw boom.unauthorized('error, bad request');
        }

        //Generamos un token
        const payload = { sub: seller.id };
        const token = jwt.sign(
            payload, CONFIG.jwtSecretRecPassword, 
            { expiresIn: '15min'}
        );
        const link = `http://myfrondend.com/recovery?token=${token}`;

        //Guardamos el token en la bdd
        await service.update(seller.id, seller.id, { recoveryToken: token });

        //Enviamos el email
        const mail = {
            from: '"Recuperación de cuenta " <no-reply@sellers.com>', //sender address
            to: `${seller.email}`,
            subject: "Recuperación de contraseña",
            html: `<b>Ingresa a este link para recuperar tu contraseña: ${link}</b>`
        }

        const response = await mailService.sendEmail(mail);

        return response;
    }

    //Actualización del password
    async changePassword(token, password){
        try {
            //Verificamos el token
            const payload = jwt.verify(token, CONFIG.jwtSecretRecPassword);
            
            
            //Información del usuario
            const seller = await service.findById(payload.sub);
            console.log('PAYLOAD:', seller.recoveryToken);
            console.log('PAYLOAD:', token);

            //Si el token no coincide con el de la bdd, retornamos el error
            if(seller.recoveryToken !== token){
                throw boom.unauthorized('Bad request, token expired');
            }

            //Hash de la contraseña 
            const hash = await bcrypt.hash(password, 10);

            //Actualizamos el usuario
            await service.update(seller.id, seller.id, { recoveryToken: null, password: hash});

            return { message: 'password changed'};
        } catch (error) {
            throw boom.unauthorized("Failed password change");
        }
    }
}

module.exports = AuthService;