import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAccessGuard } from './guards/login-access.guard';
import { UserAccessGuard } from './guards/user-access.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginAccessGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [UserAccessGuard],
  }, {
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
