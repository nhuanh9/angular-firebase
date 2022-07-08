import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import {RouterModule, Routes} from "@angular/router";
import {ListProductComponent} from "../user/list-product/list-product.component";

const routes: Routes = [
  {
    path: '',
    component: ManageUserComponent
  }, {
    path: 'products',
    component: ManageProductComponent
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    ManageUserComponent,
    ManageProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
