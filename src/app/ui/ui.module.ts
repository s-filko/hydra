import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [UsersComponent, UserEditComponent, UserListComponent, LayoutComponent, BreadcrumbComponent],
    exports: [
        LayoutComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class UiModule { }
