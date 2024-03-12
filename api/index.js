const express = require('express');

const app = express();

app.use(express.json());

//Ruta del servidor
app.get('/api/', (req, res) => {
    res.send('Express, mi servidor');
});

//levantamos el servidor
app.listen(3000, () => {
    console.log('Listening at: http://localhost:' + 3000 + '/api');
});

