const express = require('express');
const router = express.Router();
const Tenants = require('../model/tenant')

router.get('/', (req, res) => {
    Tenants.find({}, (err, data)=>{
        if (err) return res.send({error: 'AQUI ' + err});
        return res.send(data);
    });
});


router.post('/', (req, res) => {
    const {image, name, cpf, birthday, phone, adress } = req.body;

    if (!image || !name || !cpf || !birthday || !phone || !adress){
        return res.send({error: 'Dados insuficientes.'})
    }

    Tenants.findOne({cpf}, (err, data) => {
        if (err){
            return res.send({ error: 'Error ao buscar user ' + err});
        }
        if (data){
            return res.send({ error: 'User cadastrado'});
        }

        Tenants.create(req.body, (err, data) => {
            if (err){
                return res.send({ error: 'Error ao buscar user '+ err});
            }
            return res.send(data);
        });
    });
});

module.exports = router;