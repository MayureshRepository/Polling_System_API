const mongoose = require('mongoose');

const optionsSchema =new mongoose.Schema({
    options:{
        type:String,
        required:true,
        unique:true
    },
    votes:{
        type:Number,
        default:0
    },
    link_to_Vote:{
        type:String
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }
},
{
    timestamps:true
});


const Options = mongoose.model('Options' , optionsSchema);
module.exports = Options;

