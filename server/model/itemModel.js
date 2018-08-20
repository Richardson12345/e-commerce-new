var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let itemSchema = new Schema({
    name: {
        type: String,
        unique : true,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imageUrl : {
        type : String,
        required: true
    },
    category : {
        type : String,
        required: true
    },
    description: {
        type : String
    }
  }
)

let itemModel = mongoose.model("item", itemSchema)

module.exports = itemModel;