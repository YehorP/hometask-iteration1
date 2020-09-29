import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user'
import { UserRequestService } from '../services/user-request.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  isWrongData:boolean;
  showCreateForm:boolean;
  user:User;
  constructor(private userRequestService:UserRequestService, private router: Router) { }

  ngOnInit(): void {
    this.showCreateForm = true;
    this.isWrongData = false;
    this.user = new User();
  }

  onCreateUser() {
    this.userRequestService.registerNewUser(this.user)
    .subscribe( 
      res => {
      this.router.navigate(["/login"]);
      },
      error => {
        this.isWrongData = true;
        console.log(error);
      }
    )
  }

  checkIfSubmitable() {
    return (this.user.username === undefined || this.user.password === undefined || this.user.email === undefined) ||
    ( this.user.username.trim() === '' || this.user.password.trim() === '' || this.user.email.trim() === '');
  }
}
