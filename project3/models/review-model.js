const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    content: {
        type: String,
       
    }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;