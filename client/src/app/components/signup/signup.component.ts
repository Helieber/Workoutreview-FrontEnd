import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpInfo ={
    // fullName: "",
    username: "",
    password: ""
  };
  errorMessage: string;

  constructor( private myAuthService: AuthService, private myRouter: Router) { }

  ngOnInit() {
  }

  submitForm() {
    this.myAuthService
    .signup(this.signUpInfo)
    .then(resultFromApi => {
      // Clear Form
      this.signUpInfo = { 
        // fullName:"", 
        username: "", 
        password: ""};

      //  clear error message
      this.errorMessage = "";

      //  Redirect
      this.myRouter.navigate(["/login"]);
    })

    .catch(err => {
      const parsedError = err.json();
      this.errorMessage = parsedError.message + " 🤯 ";
    });
  
  }

}


