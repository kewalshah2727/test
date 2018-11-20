
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService} from '../api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  notvalid = false;
  cacheres: any;
  
  myForm : FormGroup;

  firstName: FormControl; 
  lastName: FormControl;
  email: FormControl;
  password1: FormControl;
  password2: FormControl;
  number: FormControl;
  localuser :any;
  cnumber : any;
  localpass : any;
  userGroup : any;
  userProfileId : any;

  constructor( private apiservice:ApiService,private router: Router, private _location: Location) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }



  createFormControls() { 
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
    ]);
    this.password1 = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);

    this.password2 = new FormControl('',[
      Validators.required,
      
    
    ])


    this.number = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]);
  }

  createForm() { 
    this.myForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),

      password :new FormGroup({

        password1: this.password1,
        password2: this.password2,


      }),

      email: this.email,
     
      number: this.number
    });
  }



  routeToLogin(){

    this.router.navigate(['login']);



  }
  closesearch() {

    // this.searchon = false;
    // this.router.navigate(['/'])
    this._location.back();
  }


  register( ) {

    if(this.myForm.valid && this.cacheres ) {

console.log('form submitted');

      this.notvalid = false
    console.log(this.myForm.value.email);
    console.log(this.myForm.value.password.password1);
    // console.log(this.myForm.value.name.firstName);
    // console.log(this.myForm.value.name.firstName);


    this.apiservice.registerUser({

      "username":this.myForm.value.number,
      "password":this.myForm.value.password.password1
    }).then(data=> {
    console.log('data register', data);
    
      if(data['status'] == true) {
        {
          this.apiservice.getDataFromServer( '/create/userprofile/',  {

                    "firstName":this.myForm.value.name.firstName,
            "lastName":this.myForm.value.name.lastName,
            "userId":data['user']['userId'],
            "gender":"M",
            "mobile":this.myForm.value.number,
            "email" : this.myForm.value.email

          }).then(data=>{
            console.log(' create profile data',data );
            if(data['status'])
            {
              console.log('res after create profile',data);
            if(localStorage.getItem('localuserstatus')!='true') {
          this.apiservice.setUserLoggedIn(data);
            // console.log('data auth', this.apiservice.setUserLoggedIn)
            this.localuser = data['data']['email'];
            this.cnumber = data['data']['user']['username'];
            this.localpass = this.myForm.value.password.password1;
            this.userGroup = data['data']['user']['userGroup'][0]['name'];
            this.userProfileId = data['data']['user']['userId'];
            localStorage.setItem('currentUser', this.localuser);
            localStorage.setItem('currentNumber', this.cnumber);
            localStorage.setItem('currentPass', this.localpass);
            localStorage.setItem('currentGroup', this.userGroup);
            localStorage.setItem('userProfileId', this.userProfileId);
            // this.router.navigate(['/']);
			alert("Success");
            this._location.back();
              }
            }
})

        } }
                else {
				alert("Failed");
    
           }
 })

    }

else {
  this.notvalid = true
}

 

} //reg end





}

