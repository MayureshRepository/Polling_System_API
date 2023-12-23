
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port =8000;

const db=require('./config/mongoose');
const questionSchema = require('./model/question');


// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line if you're working with JSON data

//Adding Routes

app.use('/',require('./router/index'));

app.listen(port,function(err){
    if(err){
        console.log("There is an error");
        return;
    }
 console.log(`Server is Up and Running oN Port ${port}`);

})



