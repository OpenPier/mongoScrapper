var mongoose = require("mongoose");

//save a reference to the Schema conconstructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new NotesSchema Object

var NotesSchema = new Schema({
    //'title' is type String
    title: String,
    //'body' is of type string
    body: String
});

//Creating model from the schema above, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

//Export the Notes model
module.exports = Note