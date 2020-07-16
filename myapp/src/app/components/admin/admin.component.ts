import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../defaults/default/default.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout(){

    this.router.navigate(['/login']);
  }

}
