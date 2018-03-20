import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { WorkoutService } from '../../services/workout.service'

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {

  newWorkout = {
    workoutName:'',
    workoutDuration:''
  }
  savingErr: String;
  
  constructor(
    private myAuthService: AuthService,
    private myWorkoutService: WorkoutService,
    private myRouter: Router
  ) { }

  ngOnInit() {}

  saveWorkout(){
    this.myWorkoutService.createNewWorkout(this.newWorkout)
    .then( res => {
      this.newWorkout = {
        workoutName:'',
        workoutDuration:''
      }
      this.myRouter.navigate(['/workouts'])  
    })
    .catch( err => { this.savingErr = "Something went wrong saving. 😰"})

  }
}
