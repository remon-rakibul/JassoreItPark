const mongoose = require('mongoose');

// SCHEMA
let reviewSchema = mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comment: String
});

// EXPORTING MODEL
module.exports = mongoose.model("Review", reviewSchema);