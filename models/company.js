const mongoose = require('mongoose');

//DB SCHEMA
let companySchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

//EXPORTING DB MODEL
module.exports = mongoose.model("company", companySchema);