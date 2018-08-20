var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique : true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

let userModel = mongoose.model("user", userSchema);

module.exports = userModel;