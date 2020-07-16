import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { Respsck } from 'src/app/model/respsck';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
fgregister: FormGroup;

  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router) {
    this.fgregister = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]

    });

   }

  ngOnInit(): void {
  }

  register(){


    // tslint:disable-next-line: prefer-const
    let obj = this.fgregister.value;
    delete obj.cpassword;
    // console.log(obj);
    this.cs.userregister(obj).subscribe((resp: Respsck) => {
      if (resp.ack){
        this.cs.alert('success', 'Account created Successfully', 'ok', 3000 );
        this.router.navigate(['/login']);
      }
      else{
        this.cs.alert('error', 'Registration is fail' );

      }


    });
  }
}
