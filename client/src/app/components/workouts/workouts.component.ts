import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";
import { WorkoutService } from '../../services/workout.service'


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  // currentUser: any ={};
  logoutError: string;
  workoutListError: string;
  workouts: Array<Object>;
  // workouts: any;
  currentUser: string

  constructor(
    private myAuthService: AuthService, 
    private myRouter: Router, 
    private myWorkoutService: WorkoutService) { }

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in
      .then(resultFromApi => {
        this.currentUser = resultFromApi;
        console.log(resultFromApi)
  
        this.getTheWorkouts();
      })

      .catch( err=> {
        console.log(err);
        this.myRouter.navigate(["/"]);
      });
    // this.getThePhones();
      
  }

  getTheWorkouts(){
    this.myWorkoutService.getAllWorkouts()
    .subscribe(allTheWorkouts => {
      console.log("allTheWorkouts: ", allTheWorkouts)
        this.workouts = allTheWorkouts;
      },
      () => {
        this.workoutListError = "Sorry, no workouts.";
      }
    );
  } // close getTheWorkouts()

  

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