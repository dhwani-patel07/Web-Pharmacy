import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      mobile: [
        '7777777777',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['test@api', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
      
    }
  }
}
