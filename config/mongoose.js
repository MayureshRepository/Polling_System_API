const mongoose = require('mongoose');

const express = require('express');

mongoose.connect('mongodb://localhost:27017/pollingApi');
const db= mongoose.connection;


db.on('error',console.error.bind(console,'there is an error'));

db.once('open' ,function(){
    console.log("Conneccted to Polling Api DB!!");
});



module.exports = db;