const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const SellerService = require('./sellers.service');

const service = new SellerService();

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
}

module.exports = AuthService;