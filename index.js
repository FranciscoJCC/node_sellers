const express = require('express');
const routerApi = require('./routes/v1/index');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middelwares/error.handler');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

//Ruta del servidor
app.get('/api/', (req, res) => {
    res.send('Express, mi servidor');
});

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

