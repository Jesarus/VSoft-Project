const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true, lowercase: true},
    phone: {type: String, require: true},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);