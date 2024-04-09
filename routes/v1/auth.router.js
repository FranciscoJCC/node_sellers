const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { CONFIG } = require('./../../config/config');
const validatorHandler = require('./../../middelwares/validatorHandler');
const { recoverySchema } = require('./../../schemas/auth.schema');
const AuthService = require('./../../services/auth.service');


const router = express.Router();
const service = new AuthService();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;

            res.status(200).json(service.signToken(user));
        } catch (error) {
            next(error);
        }
    }
);


router.post('/recovery', 
    validatorHandler(recoverySchema, 'body'),
    async (req, res, next) => {
        try {
            const { email } = req.body;
            
            const response = await service.sendRecovery(email);

            res.status(200).json({message: 'The email was sent successfully'});
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;