const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/v1/index');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middelwares/error.handler');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

//Ruta del servidor
app.get('/api/', (req, res) => {
    res.send('Express, mi servidor');
});

//Cors
const whiteList = ['http://localhost:8080'];
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin) || !origin){
            callback(null, true);
        }else{
            callback(new Error('Permission Denied'));
        }
    }
}

app.use(cors(options));

//Router api
routerApi(app);

//Middlewares, deben ir despues del routerApi
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//levantamos el servidor
app.listen(port, () => {
    console.log('Listening at: http://localhost:' + port + '/api');
});

