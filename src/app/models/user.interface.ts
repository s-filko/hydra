export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
}

export class User implements IUser {
  id: number;
  age: number;
  firstName: string;
  lastName: string;

  constructor(firstName: string = '', lastName: string = '', age: number = null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}
