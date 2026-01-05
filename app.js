const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).send('Halo! Backend SecondBrain sudah jalan.');
});

module.exports = app;