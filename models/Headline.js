import { WSAENETUNREACH } from "constants";

var mongoose = require("mongoose");

//Saving a reference to the Schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new UserSchema object
var HeadlineSchema = new Schema({
    //'title is required and of type String
    title:{
        type: String,
        required: true
    },
    //'link is required and of type string
    link: {
        type: String,
        required: true
    },
    //'note' is an object that store a Note id
    //The ref property links that ObjectId to the Note model
    //This allows us to populate the Headline with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//This creates our modal from the above schema, using mongoose's model method
var Headline = mongoose.model("Article", ArticleSchema);

//Export the Headline model
module.exports = Headline;