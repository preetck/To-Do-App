const express = require('express');
const router = require("./routes");
const app = express();
const port = '8000';

//Some Middlewares 
app.use(express.static('assets'))
app.use('/',router);

//Setting up View Engine
app.set('view engine','ejs');
app.set('views','./views');

//Starting the server by listeneing on port 8000
app.listen(port,function(err){
    if(err){
        console.log(`Error while running the server on port number : ${port}`);
    }
    else{
        console.log(`Server is up and running on port number :${port}`);
    }
});