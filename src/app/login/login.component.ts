import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../shared/toastr/toaster.service';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [SharedModule, CommonModule,
    FormsModule,
    ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup ;
  public userdetails: any;
  public userDet: any = {
    username: null,
    pin: null
  };
  public variableValidations: any = {
    pin: [Validators.required, Validators.minLength(4)],
    username: [Validators.required],
  }
  public loader= false;
  constructor(private _toaster: ToasterService,public _route: Router) { }

  ngOnInit(): void {
  }
  login() {
    if (this.loginForm?.invalid) {
      this.validateAllFormFields(this.loginForm);
      this._toaster.toast('warning', 'Warning', 'Please fill all the required fields');
      return;
    }
    try {
      let input= {userId: null, pin: null};
      input['userId'] = this.userDet.username;
      input['pin'] =this.userDet.pin;
      this.loader = true;
      this._route.navigate(['/app'])
    } catch (error) {
      this.loader = false;
      console.error(error);
      this._toaster.toast('error', 'Error', 'Error while Loging in.', true);
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    try {
      Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  get f() { return this.loginForm?.controls; }
}
