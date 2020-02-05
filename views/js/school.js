const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    address : {
        type : String,
        required : true 
    },
    feedback : {
        type : String,
        required : false
    },
    location : {
        type : String,
        required : false
    }
});

module.exports = mongoose.model('schools' , schoolSchema);