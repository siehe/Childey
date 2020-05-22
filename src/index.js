const express = require('express');
const app = express();

app.use('/test/:id', (req, res) => {
    let id = req.params["id"];
    res.status(200)
        .send({
            id: id
        });
});

app.listen(3000, () => {
    console.log('app is running ^_^');
});