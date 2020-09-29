import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user:User;
  constructor(private route:ActivatedRoute, private dataTransfer:DataTransferService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('userInfo')){
      this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    }else{
      this.dataTransfer.user.subscribe(value =>{
        this.user = value;
        }
      );
    }
  }

}
