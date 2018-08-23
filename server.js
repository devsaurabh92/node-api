const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");


//database cnnection
require("./mongo");
//Models
require("./model/Post");
require("./model/Comment");

//middleware
app.use(bodyParser.json()).use(morgan()) ;


//routes

app.use("/posts",require("./routes/posts"));

app.use((req,res,next)=>{
    req.status = 400;
    const error = new Error("Routes not Found");
    next(error);
});

//error hndler

if(app.get('env')==='production'){
  app.use((error,req,res,next)=>{
    res.status(req.status||500).send({
        message:error.message
    })
});  
}

app.use((error,req,res,next)=>{
    res.status(req.status||500).send({
        message:error.message,
        stack: error.stack
    })
});

app.listen(3001, function () {
    console.log('server running on port 3001');
})