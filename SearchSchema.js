var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecentSearchSchema = new Schema({
    url : {
        type : String,
    },
    
    alttext : {
        type : String
    },
    thumbnail : {
        type : String
    }
    
});

module.exports = mongoose.model('Recent', RecentSearchSchema);