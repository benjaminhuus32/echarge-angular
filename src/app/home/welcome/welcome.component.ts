import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(public afAuth: AngularFireAuth, private router: Router){

  }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.afAuth.signOut();
  }

  routeToSignup(){
    this.router.navigate(['home/signup']);
  }

  routeToLogin(){
    this.router.navigate(['home/login']);
  }

}
