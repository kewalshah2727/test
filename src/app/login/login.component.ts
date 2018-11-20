import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service'
import { Router } from '@angular/router';
// import {Md5} from 'ts-md5/dist/md5';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  notvalid = false;
  localpass: any;
  localuser: any;
  userGroup: any;
  cnumber: any;
  userProfileId : any;
  myForm: FormGroup;


  email: FormControl;
  password: FormControl;


  userData: any;
  constructor( private apiservice: ApiService, private router: Router, private _location: Location) {

  }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
  }

  closesearch() {

    // this.searchon = false;
    this._location.back();
  }



  createFormControls() {

    this.email = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]);
    this.password = new FormControl('', [
      Validators.required,

    ]);




  }

  createForm() {
    this.myForm = new FormGroup({

      password: this.password,
      email: this.email,


    });
  }




  login() {

    console.log('in login')

    if (this.myForm.valid) {
      this.notvalid = false
      this.apiservice.getDataFromServer('/login/', {

        "username": this.myForm.value.email,
        "password": this.myForm.value.password
      }).then(data => {
        console.log('data', data);
        if (data['status'] == true) {
          {
            this.apiservice.setUserLoggedIn(data);
            // console.log('data auth', this.apiservice.setUserLoggedIn)
            this.localuser = data['data']['email'];
            this.cnumber = data['data']['user']['username'];

            this.localpass = this.myForm.value.password;
            this.userGroup = data['data']['user']['userGroup'][0]['name'];
            this.userProfileId = data['data']['user']['userId'];
            localStorage.setItem('currentUser', this.localuser);
            localStorage.setItem('currentNumber', this.cnumber);
            localStorage.setItem('currentPass', this.localpass);
            localStorage.setItem('currentGroup', this.userGroup);
            localStorage.setItem('userProfileId', this.userProfileId);
            console.log('logged in sucessfully', data);
            // this.router.navigate(['/']);
            alert("Success");
            this._location.back();
             // window.location.reload();
            // this.router.navigate(['/']);

          }
        }
        else {
			alert("Failed");
    
           }
      });
    }
    else {
      this.notvalid = true
    }

  }

  routeToRegister() {

    this.router.navigate(['register']);

  }




}
