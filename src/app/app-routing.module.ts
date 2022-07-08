import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./helper/auth-guard";
import {LoginComponent} from "./component/login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminAuthGuard} from "./helper/admin-auth-guard";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    component: AdminComponent
  },  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
