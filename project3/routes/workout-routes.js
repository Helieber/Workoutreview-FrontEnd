const mongoose = require("mongoose");
const express = require("express");
// const multer = require('multer');
const workoutRoutes = express.Router();

const Workout = require('../models/workout-model');

// multer for photo
// const myUploader = multer({
//   dest: __dirname + "/../public/uploads/"
// });


// create new workout
workoutRoutes.post('/api/workouts/new', (req, res, next) => {

  if (!req.user) {
    res.status(401).json({
      message: "Log in to create workout."
    });
    return;
  }
  const newWorkout = new Workout({
    typeOfExercise: req.body.typeOfExercise,
    sets: req.body.sets,
    reps: req.body.reps,
    duration: req.body.duration,
    owner: req.user._id
  });

  console.log("====================", newWorkout)
  newWorkout.save((err) => {
    if (err) {
      res.status(500).json({
        message: "Some weird error from DB."
      });
      return;
    }
    // validation errors
    if (err && newWorkout.errors) {
      res.status(400).json({
        brandError: newWorkout.errors.brand,
      });
      return;
    }
    req.user.encryptedPassword = undefined;
    newWorkout.user = req.user;

    res.status(200).json(newWorkout);
  });
});

// list the workouts

workoutRoutes.get('/api/workouts', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Log in to see workouts."
    });
    return;
  }
  Workout.find()
    // retrieve all the info of the owners (needs "ref" in model)
    // don't retrieve "encryptedPassword" though
    .populate('user', {
      encryptedPassword: 0
    })
    .exec((err, allTheWorkouts) => {
      if (err) {
        res.status(500).json({
          message: "Workouts find went bad."
        });
        return;
      }
      res.status(200).json(allTheWorkouts);
    });
});

// list single workout
workoutRoutes.get("/api/workouts/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Log in to see the Workout."
    });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }

  Workout.findById(req.params.id, (err, theWorkout) => {
    if (err) {
      //res.json(err);
      res.status(500).json({
        message: "Workouts find went bad."
      });
      return;
    }

    res.status(200).json(theWorkout);
  });
});

// update the workout
workoutRoutes.put('/api/workouts/:id', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Log in to update the Workout."
    });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }

  const updates = {
    typeOfExercise: req.body.typeOfExercise,
    sets: req.body.sets,
    reps: req.body.reps,
    duration: req.body.duration


  };

  Workout.findByIdAndUpdate(req.params.id, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Workout updated successfully."
    });
  });
});

// delete workout
workoutRoutes.delete("/api/workouts/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Log in to delete the workout."
    });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid."
    });
    return;
  }

  Workout.remove({
    _id: req.params.id
  }, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Workout has been removed."
    });
  });
});


module.exports = workoutRoutes;