require('dotenv').config();

const CONFIG = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3001,
    dbUser : process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    TZ: process.env.TZ,
    JwtSecret: process.env.JWT_SECRET,
    jwtSecretRecPassword: process.env.JWT_SECRET_REC_PASSWORD,
    userEmail : process.env.USER_EMAIL,
    emailPasword: process.env.EMAIL_PASSWORD,
    portEmail: process.env.PORT_EMAIL,
    smtpHost: process.env.SMTP_HOST
}

module.exports = { CONFIG };