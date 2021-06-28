const express = require('express');
var request = require('request');
const router = express.Router();
const Visitors = require('../model/visitor')

router.get('/', (req, res) => {
    Visitors.find({}, (err, data)=>{
        if (err) return res.send({error: 'AQUI ' + err});
        return res.send(data);
    });
});


router.post('/', (req, res) => {
    const {image, name} = req.body;

    if (!image || !name){
        return res.send({error: 'Dados insuficientes.'})
    }

    Visitors.findOne({name}, (err, data) => {
        if (err){
            return res.send({ error: 'Error ao buscar user ' + err});
        }
        if (data){
            return res.send({ error: 'User cadastrado'});
        }

        Visitors.create(req.body, (err, data) => {
            if (err){
                return res.send({ error: 'Error ao buscar user '+ err});
            }
            var options = {
                'method': 'POST',
                'url': 'https://hml-api.biopassid.com/multibiometrics/enroll',
                'headers': {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': '{{subscription-key}}'
                },
                body: JSON.stringify({
                    "Person": {
                    "CustomID": `${data.name}`,
                    "Fingers": [
                        {

                    }
                    ],
                    "Face": [
                        {
                        "Face-1": `${data.image}`
                        }
                    ]
                    }
                })
            };

            request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
            });
            console.log(options.body)
            return res.send(data);
        });
    });
});

module.exports = router;