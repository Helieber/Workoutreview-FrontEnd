import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MainComponent} from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutDetailsComponent } from './components/workout-details/workout-details.component';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';
import { ReviewWorkoutComponent } from './components/review-workout/review-workout.component';


export const routes: Routes = [
    { path: 'index', component: MainComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'workouts', component: WorkoutsComponent },
    { path: 'workouts/:id', component: WorkoutDetailsComponent},
    { path: 'add-workout', component: NewWorkoutComponent},
    { path: 'add-review', component: ReviewWorkoutComponent},
    { path: '**', redirectTo: '' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {} 