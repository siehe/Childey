const express = require('express');
const app = express();
const mongoose = require('mongoose');
const doctorRouter = require('./routes/doctor');
const patientRouter = require('./routes/patient');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/test/:id', (req, res) => {
    let id = req.params["id"];
    res.status(200)
        .send({
            id: id
        });
});

app.use('/', doctorRouter);
app.use('/', patientRouter);

mongoose.connect('mongodb+srv://siehi:VeryVitalik228@cluster0-mr1at.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection
 .once('open', () => console.log('Good to go!'))
 .on('error', (error) => {
 console.warn('Warning', error);
 });

app.listen(3000, () => {
    console.log('app is running ^_^');
});