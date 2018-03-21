const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review-model');

const WorkoutSchema = new Schema({
    typeOfExercise: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reviews: [Review.schema]
}, {
    timestamps: true
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
// boo