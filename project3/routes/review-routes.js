const express = require('express');
const mongoose = require('mongoose');
const Workout = require('../models/workout-model');

const Review = require('../models/review-model');

const reviewRoutes = express.Router();

// Route to Handle New Review Form
// router.get('/workouts/:workoutId/reviews/new', (req, res, next) => {
//     let workoutId = req.params.workoutId;

//     Workout.findById(workoutId, (err, workout) => {
//         if (err) { next(err); }
//         res.render('workout-reviews/new', { workout: workout });
//     });
// });

// Route to Handle Review Form Submission
reviewRoutes.post('/api/workouts/:id/reviews', (req, res, next) => {
    // Load the Workout from the Database
    // let id = req.params.id;
    // console.log(id)
    // console.log("req.params.id:  ", req.params.id)
    Workout.findById(req.params.id, (err, workout) => {
        // Create the Schema Object to Save the Review
        const newReview = new Review({
            content: req.body.content
        });

        // Add Review to Workout Reviews Array
        workout.reviews.push(newReview);

        // Save the workout to the Database
        workout.save((err) => {
            if (err) {
                return next(err)
            }

            res.status(200).json(workout);
        });
    });
});

module.exports = reviewRoutes;