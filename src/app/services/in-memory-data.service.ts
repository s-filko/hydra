import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: IUser[] = [
      { id: 1, firstName: 'John', lastName: 'Smith', age: 33 },
      { id: 2, firstName: 'Daniel', lastName: 'Hansen', age: 45 },
      { id: 3, firstName: 'Arvid', lastName: 'Olsen', age: 23 },
    ];
    return {users};
  }

  /**
   * Generate user item ID
   */
  genId(users: IUser[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
