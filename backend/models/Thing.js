const mongoose = require('mongoose');


// Create a data schema that contains the fields for each  Thing  , their type, and whether or not they are a required field.
// Mongoose's  Schema  method lets you create a data schema for your MongoDB database.
const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},
});

// Export that schema as a Mongoose model, making it available for your Express app.
// The  model  method turns that schema into a usable model.
module.exports = mongoose.model('Thing', thingSchema);