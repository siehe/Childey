const express = require('express');
const LiqPay = require('liqpay-sdk');
const router = express.Router();
const {Appointment} = require('../models/appointment.model');

const private_key = "sandbox_OF244ICJDG1SR5msprp1ThSFJanZgXm67vApFW45";
const public_key = "sandbox_i58516531921";


router.post('/liqpay/:appointmentId', async (req, res) => {

    const liqpay = new LiqPay(public_key, private_key);
    const data = req.body.data;
    const signature = req.body.signature;
    liqpay.api("request", {
            "action"   : "status",
            "version"  : "3",
            "order_id" : req.params.appointmentId
        }, async json =>{
    		const appointment = await Appointment.findById(req.params.appointmentId);

    		await appointment.update({isPayed: json.status === "success"});

    		await appointment.save();

    		if(json.status === "success"){
        		res.sendStatus(201);
    		}
    		else{
        		res.sendStatus(400);
   		}
    		res.sendStatus(200);
	}, 
	   (err, response) => console.log("error " + err + " response " + JSON.stringify(response))); 
	res.sendStatus(400);
});

module.exports = router;
