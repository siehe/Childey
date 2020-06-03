const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send('Access denied');
    }

    
    try{
        const decoded = jwt.verify(token, config.myprivatekey);
        req.doctor = decoded;
        next();
    }
    catch(ex){
        res.status(401).send('Invalid token');
    }
}