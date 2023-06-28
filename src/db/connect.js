const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/newCollection", {
    useNewUrlParser: true,         //to avoid deprecation warnings
    useUnifiedTopology:true,
    useCreateIndex: true
}).then(() =>{
    console.log(`Connection Successful`);
}).catch((e) =>{
    console.log(`No Connection`);
});