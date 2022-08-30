const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/furniture', require('./routes/furniture'));
app.use('/api/basket', require('./routes/basket'));

app.listen(process.env.PORT, () => {
    console.log('Server Listening on port ' + process.env.PORT);
});