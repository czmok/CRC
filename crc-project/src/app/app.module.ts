import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserFormModuleModule } from './user-form-module/user-form-module.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { UserFormComponent } from './user-form-module/user-form/user-form.component';
import { UserActionModuleModule } from './user-action-module/user-action-module.module';
import { UserPermissionsComponent } from './user-action-module/user-permissions/user-permissions.component';
import { UserRequestsComponent } from './user-action-module/user-requests/user-requests.component';
import { WrapperRequestService } from './wrapper.request.service';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { ApproverActionModuleModule } from './approver-action-module/approver-action-module.module';
import { RequestsComponent } from './approver-action-module/requests/requests.component';
import { Observable } from 'rxjs/Observable';
import { CanActivateUser, Permissions } from './authentication-service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'userForm/:userId', component: UserFormComponent, canActivate: [CanActivateUser],
    children: [
      { path: 'userRequestes', component: UserRequestsComponent },
      { path: 'userPermissions', component: UserPermissionsComponent },
      { path: 'requests', component: RequestsComponent }]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    RouterModule.forRoot(
      routes, { useHash: true }
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UserFormModuleModule,
    UserActionModuleModule,
    ApproverActionModuleModule
  ],
  exports: [RouterModule],
  providers: [LoginService, WrapperRequestService, CanActivateUser, Permissions],
  bootstrap: [AppComponent]
})
export class AppModule { }
