import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IUser } from '../../../models/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  /**
   * Add User form
   */
  userForm = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', Validators.required],
  });

  public isUserResolved: boolean;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const resolvedUser: IUser = this.route.snapshot.data.user;
    this.isUserResolved = !!resolvedUser;

    if (resolvedUser) {
      this.userForm.patchValue(resolvedUser);
    }
  }

  /**
   * Process form submission
   */
  onSubmit() {
    if (this.userForm.valid) {
      this.api.setUser(this.userForm.value).subscribe(result => {
        this.router.navigateByUrl('/users/list');
      });
    } else {
      this.validateAllFormFields(this.userForm);
    }
  }

  /**
   * Process form validation
   * and trigger error highlighting
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * Checks field validity
   * by name
   */
  isFieldValid(field: string) {
    return !this.userForm.get(field).valid && this.userForm.get(field).touched;
  }

}
