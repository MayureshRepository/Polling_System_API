const mongoose = require('mongoose');

const express = require('express');

mongoose.connect(`mongodb+srv://mayureshpatrikar67:0Ss7sn98JCVVracF@cluster0.lxl9v7r.mongodb.net/?retryWrites=true&w=majority`);
const db= mongoose.connection;


db.on('error',console.error.bind(console,'there is an error'));

db.once('open' ,function(){
    console.log("Conneccted to Polling Api DB!!");
});



module.exports = db;