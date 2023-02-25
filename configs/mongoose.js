const mongoose=require('mongoose');

//connect to db
mongoose.connect(process.env.MONGO_URI);


//acquire the connection of check if it is successful
const db=mongoose.connection;

//Error
db.on('error',console.error.bind(console,'error connecting to db'));

//Connected
db.once('open',function(){
    console.log('connected to db');
})

module.exports=db;