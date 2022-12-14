const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/furniture', require('./routes/furniture'));
app.use('/api/basket', require('./routes/basket'));
app.use('/api/mail', require('./routes/mail'));

app.listen(process.env.PORT, () => {
    console.log('Server Listening on port ' + process.env.PORT);
});
