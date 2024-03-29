const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { CONFIG } = require('./../../config/config');
const router = express.Router();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;

            const payload = {
                sub: user.id,
                role: 'seller'
            };

            const token = jwt.sign(payload, CONFIG.JwtSecret);

            res.status(200).json({user, token});
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;