import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";
import { WorkoutService } from '../../services/workout.service'

import "rxjs/add/operator/toPromise";

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {
  currentUser: string;
  workoutListError: string;
  workout = <any>{};
  logoutError: string;
  updatedWorkoutName: string;
  updatedWorkoutDuration: Number;
  updatedWorkout: any = {}
  savingErr: string;
  reviewData = {
    content: ''
  }

  public typeOfExercise: string;
  public duration: Number;

  constructor(
    private myRoute: ActivatedRoute,
    private myAuthService: AuthService,
    private myRouter: Router,
    private myWorkoutService: WorkoutService
  ) { }

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in
      .then(resultFromApi => {
        this.currentUser = resultFromApi;
        console.log(resultFromApi)
      })
      // Even if u don't do anything on error, catch to void a console log error
      .catch(err => {
        console.log(err)
        this.myRouter.navigate(["/workouts"])
      })
    this.myRoute.params.subscribe(params => {
      this.getDetails(params['id']);
    });
  }

  getDetails(id) {
    this.myWorkoutService
      .getOneWorkout(id)
      .then(workoutDetail => {
        console.log('workoutDetail: ', workoutDetail)
        this.workout = workoutDetail;
      })
  }

  doTheUpdate(id, formData) {
    //this.myWorkoutService.updateOne(id, formData)
    console.log("workoutid:", this.workout._id)
    const formInfo = formData.form.controls;
    console.log("=============== formData:", formInfo);
    this.typeOfExercise = formInfo.workoutName.value;
    this.duration = formInfo.workoutduration.value
    console.log("workoutidafter:", this.workout._id)

    this.sendUpdatesToApi(id)


  }

  sendUpdatesToApi(id) {
    this.updatedWorkout = {
      typeOfExercise: this.workout.typeOfExercise,
      duration: this.workout.duration
    }

    console.log("updates:", this.updatedWorkout)

    this.myWorkoutService.updateOne(id, this.updatedWorkout)
      .toPromise()
      .then(res => {
        this.myRouter.navigate(['/workouts'])
      })
      .catch(err => {
        console.log("Error in the update:", err)
      });
  }

  deleteThisWorkout(id) {
    if (!confirm("Are you sure?")) {
      return;
    }
    this.myWorkoutService.deleteOne(this.workout._id)
      .then(res => {
        this.myRouter.navigate(['/workouts'])
      })
      .catch(err => {
        console.log("Error in deleting:", err)
      })

  }

  createReview(id, dataFromForm) {
    this.myWorkoutService.addComment(id, dataFromForm)
      .then(res => {
        console.log('res from add the review: ', res)
        this.reviewData = {
          content: ''
        }
        this.savingErr = '',
          this.myRouter.navigate(['/workouts'])

      })
  }

  logMeOutPls() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/login"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOutPls()


}
