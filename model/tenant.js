const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TenantSchema = new Schema({
    image: {type: String, require: true},
    name: {type: String, require: true},
    cpf: {type: String, require: true, unique: true},
    birthday: {type: String, require: true},
    phone: {type: String, require: true},
    adress: {type: String, require: true},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Tenant', TenantSchema);