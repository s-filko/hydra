import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IUser } from '../../../models/user.interface';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  colors = [
    '#3D9970',
    '#FF851B',
    '#0074D9',
    '#85144B',
    '#2ECC40',
    '#B10DC9',
    '#39CCCC',
    '#F012BE',
    '#7FDBFF',
    '#01FF70',
    '#FFDC00',
    '#FF4136',
    '#001F3F',
    '#F012BE',
  ];


  subscription: Subscription;

  /**
   * Users list
   */
  users: IUser[] = null;

  /**
   * Search tern
   */
  searchTerm: string;

  /**
   * Spinner control
   */
  isShowSpinner = false;

  /**
   * Search terms
   * use BehaviorSubject to emmit initial empty search
   * and fill users list
   */
  private userSearchTerms = new BehaviorSubject<string>(null);

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.subscription = this.userSearchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(_ => this.isShowSpinner = true),
      switchMap((term: string) => this.api.getUsersList({query: term})),
    ).subscribe(users => {
      this.isShowSpinner = false;
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUsersList(): void {
    this.userSearchTerms.next(this.searchTerm);
  }

  /**
   * Returns color based on number
   */
  getColor(num: number) {
    return this.colors[+num % this.colors.length];
  }

  /**
   * Deletes selected user
   */
  deleteUser(user: IUser) {
    if (!confirm(`User ${user.firstName} ${user.lastName} will be deleted.\rContinue?`)) {
      return;
    }

    this.isShowSpinner = true;
    this.api.deleteUser(user.id).subscribe(result => {
      this.isShowSpinner = false;
      this.users = this.users.filter(item => item.id !== user.id);
    });
  }

}
