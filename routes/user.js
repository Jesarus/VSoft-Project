const express = require('express');
const router = express.Router();
const Users = require('../model/user')

router.get('/', (req, res) => {
    Users.find({}, (err, data)=>{
        if (err) return res.send({error: 'AQUI ' + err});
        return res.send(data);
    });
});


router.post('/', (req, res) => {
    const {name, phone, email} = req.body;

    if (!name || !phone || !email ){
        return res.send({error: 'Dados insuficientes.'})
    }

    Users.findOne({email}, (err, data) => {
        if (err){
            return res.send({ error: 'Error ao buscar user ' + err});
        }
        if (data){
            return res.send({ error: 'User cadastrado'});
        }

        Users.create(req.body, (err, data) => {
            if (err){
                return res.send({ error: 'Error ao buscar user '+ err});
            }
            return res.send(data);
        });
    });
});

module.exports = router;