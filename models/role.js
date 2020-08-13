const mongoose = require('../utils/databaseConnection');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Role', roleSchema);
