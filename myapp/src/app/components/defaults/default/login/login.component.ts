import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fglogin: FormGroup;

  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router) {
    this.fglogin = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],


    });

   }

  ngOnInit(): void {
  }

  login(){

    this.cs. userlogin(this.fglogin.value.email, this.fglogin.value.password).subscribe((user: User) => {
      if (user.id != null){
      this.cs.alert('success', 'Login successfully');
      this.cs.setuser(user);
      // sessionStorage.setItem('user' , JSON.stringify(user));
      this.router.navigate (['/user']);
      }
      else{
        this.cs.alert('error', 'Fail to Login');

      }
      console.log(user);

    });
  }
}
