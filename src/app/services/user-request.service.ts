import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  baseUrl:string = 'http://localhost:59349/api';
  constructor(private http: HttpClient) { }

  getUserByUsername(username:string):Observable<any> {
    const requestUrl = `${this.baseUrl}/getUser?username=${username}`;
    return this.http.get(requestUrl);
  }

  registerNewUser(user:User):Observable<any> {
    const requestBody = {
      Username: user.username,
      Password: user.password,
      Email: user.email
    }
    return this.http.post<User>(`${this.baseUrl}/addUser`,requestBody ,httpOptions)
  }

  logout() {
    localStorage.removeItem('userInfo');
  }
}
