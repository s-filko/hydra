import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUser, User } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<IUser> {
  constructor(private api: ApiService) {
  }

  /**
   * Resolver
   *
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IUser | Observable<IUser> {

    const userId = route.params.userId;

    if (!userId) {
      return new User();
    }

    return this.api.getUser(route.params.userId).pipe(
      catchError(err => of(null)),
    );
  }
}
