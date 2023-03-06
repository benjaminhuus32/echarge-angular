import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit{

  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    })

    this.firebaseErrorMessage = '';

  }

  ngOnInit(): void {
    
  }

  loginUser() {
    if(this.loginForm.invalid)
      return;

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if(result == null) {
        console.log('logging in..');
        this.router.navigate(['/map']).then(()=>{window.location.reload()});
      } else if (result.isValid){
        console.log('login error', result);
        this.firebaseErrorMessage = result.message;

      }
    });
  }

  loggedIn(){
    return this.authService.userLoggedIn;
  }


}
