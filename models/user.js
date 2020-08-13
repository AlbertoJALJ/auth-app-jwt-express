const mongoose = require('../utils/databaseConnection');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    username: String,
    email: String,
    password: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }]
});

module.exports = mongoose.model('User', roleSchema);
