const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
    image: {type: String, require: true},
    name: {type: String, require: true},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Visitor', VisitorSchema);