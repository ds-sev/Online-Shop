import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../shared/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  submitted = false
  loginForm!: FormGroup

  constructor(
    public auth: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  submit() {
    if (this.loginForm.invalid) {
      return
    }
    this.submitted = true
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true
    }
    this.auth.login(user).subscribe(res => {
      console.log(res)
      this.loginForm.reset()
      this._router.navigate(['/admin', 'dashboard']).then()
      this.submitted = false
    })
    this.submitted = false
  }
}
