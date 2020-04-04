import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private usersUrl = 'api/users';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Creates new or updates existing user
   * depends on userId property
   */
  public setUser(user: IUser) {
    return user.id ? this.updateUser(user) : this.createUser(user);
  }

  /**
   * Returns user by id
   */
  public getUser(userId: number): Observable<IUser> {
    return this.http.get(`${this.usersUrl}/${userId}`) as any;
  }

  /**
   * Creates a new user
   */
  public createUser(user: IUser) {
    delete user.id;
    return this.http.post(this.usersUrl, user);
  }

  /**
   * Updates existing user
   */
  public updateUser(user: IUser) {
    return this.http.put(this.usersUrl, user);
  }

  /**
   * Removes user by ID
   */
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${userId}`) as any;
  }

  /**
   * Returns users list
   */
  getUsersList({query = null} = {}): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl).pipe(
      map(users => users
        .reverse() // to show the last added user on the top
        // Angular in memory web api doesn't allow to multiple fields search, so just filtering array of results.
        .filter(user => this.searchUserFilter(user, query))
      )
    );
  }

  /**
   * Filter users matching search query
   * for FirstName or LastName property value
   */
  private searchUserFilter(user, query) {
    if (!query) {
      return true;
    }

    query = query.toLowerCase();
    return user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query);
  }
}
