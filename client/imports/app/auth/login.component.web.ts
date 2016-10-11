import {Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';


//noinspection TypeScriptCheckImport
import template from './login.component.web.html';

@Component({
  selector: 'login',
  template
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user:     ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  login() {
    this.error = "Logging In...";
    if (this.loginForm.valid) {
      //Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
      //  if (err) {
      //    this.zone.run(() => {
      //      this.error = err;
      //    });
      //  } else {
      //    this.router.navigate(['/']);
      //  }
      //});

      Meteor.loginWithLDAP(this.loginForm.value.user, this.loginForm.value.password,
          {
            dn: "cn="+this.loginForm.value.user+",dc=example,dc=com",
            search: "(objectclass=*)"
          },
          (err, success) => {
            if (err) {
              this.error = err;
              console.log(err.reason);
            }
            else {
              console.log("creds accepted!")
              console.log(success);

              this.router.navigate(['/redirects']);
            }
         }
        );
    }
  }
}