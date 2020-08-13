const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Api',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(db=> console.log('Conexión a la DB exitosa'))
  .catch(db=> console.error(err))
;
module.exports = mongoose
