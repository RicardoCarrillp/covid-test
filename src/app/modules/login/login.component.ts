import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subscription!: Subscription;
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
    this.loginForm=this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
    })
    this.subscription = authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) this.router.navigate(['/dashboard'])

    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

  login(){
    this.authService.login(this.loginForm.value.username)
  }

}
