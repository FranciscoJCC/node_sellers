const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

//Ruta del servidor
app.get('/api/', (req, res) => {
    res.send('Express, mi servidor');
});

//levantamos el servidor
app.listen(port, () => {
    console.log('Listening at: http://localhost:' + port + '/api');
});

