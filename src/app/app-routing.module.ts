import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationError } from '@angular/router';
import {HomeComponent} from "./guest/home/home.component";
import {LoginComponent} from "./guest/login/login.component";
import {RegisterComponent} from "./guest/register/register.component";
import { AdminComponent } from './admin/admin/admin.component';
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {UnauthorizedComponent} from "./error/unauthorized/unauthorized.component";
import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./models/role.enum";
import { ActivateInfoComponent } from './guest/activate/activate-info/activate-info.component';
import { ActivateAccountComponent } from './guest/activate/activate-component/activate-component.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home',
   component: HomeComponent,
   canActivate: [AuthGuard],
   data: {roles: [Role.USER]}
  },

  { path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'activateInfo', component: ActivateInfoComponent},
  {path: 'activateAccount', component: ActivateAccountComponent},

  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        this.router.navigate(['/404']);
      }
    });
  }
}
