const mongoose = require('mongoose');

const {NOTES_MONGODB_HOST,NOTES_APP_MONGODB_DATABASE }= process.env;
const MONGODB_URI=`mongodb://${NOTES_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

//MONGODB_URI
//'mongodb://localhost:27017/notes'
mongoose.connect(MONGODB_URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true
})

  .then(db => console.log('Database is Coneccted'))
  .catch(err => console.log(err));