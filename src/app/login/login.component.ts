import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user'
import { DataTransferService } from '../services/data-transfer.service';
import { UserRequestService } from '../services/user-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isWrongData:boolean;
  showLoginForm:boolean;
  user:User;

  constructor(private userRequestService:UserRequestService, private router: Router, private dataTransfer:DataTransferService) { }

  ngOnInit(): void {
    this.showLoginForm = true;
    this.isWrongData = false;
    this.user = new User();
    this.userRequestService.logout();
  }

  onSubmitForm(){
   this.userRequestService.getUserByUsername(this.user.username)
   .subscribe(
      tempUser=> {
        const requestUser = new User();
        requestUser.username = tempUser.Username;
        requestUser.password = tempUser.Password;
        requestUser.idUser = tempUser.IdUser;
        requestUser.email = tempUser.Email;
        console.log(`requestUser:${requestUser.username},${requestUser.email},${requestUser.password},${requestUser.idUser}`)
        if(this.user.password == requestUser.password){
          this.router.navigate(['/user-page']);
          this.dataTransfer.updatedDataSelection(requestUser);
          sessionStorage.setItem('userInfo',JSON.stringify(requestUser));
        }
        else
          this.isWrongData = true;
      },
      error => this.isWrongData = true
   );
  }

  checkIfSubmitable() {
    return (this.user.username === undefined || this.user.password === undefined) ||
    ( this.user.username.trim() === '' || this.user.password.trim() === '');
  }
}
