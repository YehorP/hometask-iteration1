import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private dataSource = new BehaviorSubject<User>(new User());
  user = this.dataSource.asObservable();

  constructor() { 
  }

  updatedDataSelection(newUser: User){
    this.dataSource.next(newUser);
  }
}
