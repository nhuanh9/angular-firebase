import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./home/login/login.component";
import {HomeComponent} from "./home/home/home.component";
import {RegisterComponent} from "./home/register/register.component";
import {AdminComponent} from "./admin/admin/admin.component";
import {HomePageComponent} from "./user/home-page/home-page.component";
import {AdminAuthGuard} from "./helper/admin-auth-guard";
import {AuthGuard} from "./helper/auth-guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  }, {
    path: 'user',
    canActivate: [AuthGuard],
    component: HomePageComponent,
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
