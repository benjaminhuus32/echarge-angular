import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-home-signup',
  templateUrl: './home-signup.component.html',
  styleUrls: ['./home-signup.component.css']
})
export class HomeSignupComponent implements OnInit {

  signupForm: FormGroup | undefined;
  firebaseErrorMessage: string | undefined;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {

  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  signup() {
    if (this.signupForm.invalid)
      return;

    this.authService.signupUser(this.signupForm.value).then((result)=>{
      if (result==null)
        this.router.navigate(['/map']);
      else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;
    }).catch(() =>{

    });
  }

  loggedIn(){
    return this.authService.userLoggedIn;
  }

}
