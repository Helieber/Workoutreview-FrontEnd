import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutDetailsComponent } from './components/workout-details/workout-details.component';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';


export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'workouts', component: WorkoutsComponent },
    { path: 'workouts/:id', component: WorkoutDetailsComponent},
    { path: 'add-workout', component: NewWorkoutComponent},
    { path: '**', redirectTo: '' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {} 