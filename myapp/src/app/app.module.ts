import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './components/defaults/default/default.component';
import { HomeComponent } from './components/defaults/default/home/home.component';
import { RegisterComponent } from './components/defaults/default/register/register.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { UserInboxComponent } from './components/user/user-inbox/user-inbox.component';
import { UserSentComponent } from './components/user/user-sent/user-sent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './components/defaults/default/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './components/admin/admin-product/admin-product.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    UserInboxComponent,
    UserSentComponent,
    UserComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminProductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
