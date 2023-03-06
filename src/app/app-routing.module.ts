import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { HomeLoginComponent } from './home/home-login/home-login.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { HomeSignupComponent } from './home/home-signup/home-signup.component';

const routes: Routes = [
  {path:'', redirectTo: "/home", pathMatch: 'full'} ,
  {path: 'home', component: HomeComponent, children: [
    {path: '', component: HomeLoginComponent},
    {path: 'login', component: HomeLoginComponent},
    {path: 'signup', component: HomeSignupComponent}
  ]},
  {path: 'map', component: MapComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
