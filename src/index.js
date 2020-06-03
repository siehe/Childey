const express = require('express');
const app = express();
const mongoose = require('mongoose');
const doctorRouter = require('./routes/doctor');
const patientRouter = require('./routes/patient');
const paramsRouter = require('./routes/params');
const appointmentRouter = require('./routes/appointment');
const liqpayRouter = require('./routes/liqpaycheck');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.get('/test/:id', (req, res) => {
    let id = req.params["id"];
    res.status(200)
        .send({
            id: id
        });
});


app.use(morgan('common'));
app.use('/', doctorRouter);
app.use('/', patientRouter);
app.use('/', paramsRouter);
app.use('/', appointmentRouter);
app.use('/', liqpayRouter);

mongoose.connect('mongodb+srv://siehi:VeryVitalik228@cluster0-mr1at.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection
 .once('open', () => console.log('Good to go!'))
 .on('error', (error) => {
 console.warn('Warning', error);
 });

app.listen(3000, () => {
    console.log('app is running ^_^');
});