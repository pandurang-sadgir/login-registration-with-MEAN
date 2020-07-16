import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../components/defaults/default/default.component';
import { RegisterComponent } from '../components/defaults/default/register/register.component';
import { LoginComponent } from '../components/defaults/default/login/login.component';
import { UserComponent } from '../components/user/user.component';
import { UserDashboardComponent } from '../components/user/user-dashboard/user-dashboard.component';
import { UserInboxComponent } from '../components/user/user-inbox/user-inbox.component';
import { UserSentComponent } from '../components/user/user-sent/user-sent.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from '../components/admin/admin.component';
import { AdminDashboardComponent } from '../components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from '../components/admin/admin-product/admin-product.component';


const routes: Routes = [
  {path: '' , component: DefaultComponent ,
 children: [
   {path: 'register' , component: RegisterComponent},
   {path: 'login' , component: LoginComponent}]
},
{path: 'user', component: UserComponent, canActivate: [AuthGuard],
 children: [
 {path: '', component: UserDashboardComponent},
 {path: 'user-inbox', component: UserInboxComponent},
 {path: 'user-sent', component: UserSentComponent}
]},


{path: 'admin', component: AdminComponent,
 children: [
 {path: '', component: AdminDashboardComponent},
 {path: 'admin-product', component: AdminProductComponent}

]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
