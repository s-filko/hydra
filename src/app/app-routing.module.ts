import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './ui/users/user-edit/user-edit.component';
import { UserListComponent } from './ui/users/user-list/user-list.component';
import { UserResolver } from './resolvers/user.resolver';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users',
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: 'add', component: UserEditComponent, data: { breadcrumb: 'Create New User' }, resolve: { user: UserResolver } },
      { path: 'edit/:userId', component: UserEditComponent, data: { breadcrumb: 'Edit User' }, resolve: { user: UserResolver } },
      { path: 'list', component: UserListComponent, data: { breadcrumb: 'Users List' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
