/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const url = 'mongodb+srv://ewerton:orange2244@cluster0.buic1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true,  useUnifiedTopology: true};
mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json())
const userRoute = require('./routes/user'); 

app.use('/users', userRoute)

app.listen(3000, ()=>{
    console.log('Listening on port 3000.')
});

module.exports = app;