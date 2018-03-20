import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { WorkoutService } from '../../services/workout.service'
import { environment } from "../../../environments/environment";
import "rxjs/add/operator/toPromise";


@Component({
  selector: 'app-review-workout',
  templateUrl: './review-workout.component.html',
  styleUrls: ['./review-workout.component.css']
})
export class ReviewWorkoutComponent implements OnInit {

  currentUser: string;
  workout= <any>{};
  savingErr: string;
  reviewData = {
    content: ''
  }

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
        console.log(resultFromApi)})
      // Even if u don't do anything on error, catch to void a console log error
      .catch( err => {
        console.log(err)
        this.myRouter.navigate(["/workouts"])
      })
    
  
  }

  createReview(id, dataFromForm){
    this.myWorkoutService.addComment(id, dataFromForm )
    .then( res => {
      console.log('res from add the review: ', res)
      this.reviewData = {
        content: ''
      }
      this.savingErr ='',
      this.myRouter.navigate(['/workouts'])
      
    })
  }

}
