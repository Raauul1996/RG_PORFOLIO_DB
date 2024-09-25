require('dotenv').config();

const express = require('express');
const morgan = require('morgan')

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(require('./routes/index'))


if (!process.env.PORT) {
    console.error('Error: La variable de entorno PORT no está definida.');
    process.exit(1);
  }


module.exports = app
