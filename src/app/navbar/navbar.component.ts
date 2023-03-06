import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private afAuth: AngularFireAuth,
    private authService: AuthService){


  }

  reloadCurrent() {
    this.router.navigate['/home'].then(() => {
      window.location.reload();
    });
    // window.location.reload();
  }

  loggedIn(){
    return this.authService.userLoggedIn;
  }

  logout(): void {
    this.afAuth.signOut();
  }


}
