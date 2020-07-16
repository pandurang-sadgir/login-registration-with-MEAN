import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
user: User;
 // abc;
  constructor(private cs: CommonService) { }

  ngOnInit(): void {
    this.user = this.cs.getuser();
    // this.abc = JSON.parse(sessionStorage.getItem('user'));
  // this.user = JSON.parse(sessionStorage.getItem('user'));

  }

}
