import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';


@Injectable()
export class WorkoutService {

  constructor( private myHttp: Http ) { }

  getAllWorkouts(){
    return this.myHttp.get( `${environment.apiBase}/api/workouts`,
    { withCredentials: true })
    .map( res => res.json() )
  }

  getOneWorkout(id){
    return this.myHttp.get( `${environment.apiBase}/api/workouts/${id}`, 
    { withCredentials: true })
    .toPromise()
    .then( res => res.json() )
    //.map ( res => res.json() )
  }

  createNewWorkout(workoutData){
    return this.myHttp.post( `${environment.apiBase}/api/workouts/new`, workoutData,
    { withCredentials: true })
    .toPromise()
    .then( res => res.json() )
  }

  updateOne(id, updates){
    return this.myHttp.put( `${environment.apiBase}/api/workouts/${id}`, 
    updates, { withCredentials: true })
    .map( res => res.json() )
  }

  deleteOne(id){
    return this.myHttp.delete( `${environment.apiBase}/api/workouts/${id}`,
    { withCredentials: true })
    .toPromise()
  }

  addComment(id, dataToSend){
    return this.myHttp.post( `${environment.apiBase}/api/workouts/${id}/reviews`, dataToSend,
    {withCredentials: true})
    .toPromise()
    .then( res => res.json())
  }
}
